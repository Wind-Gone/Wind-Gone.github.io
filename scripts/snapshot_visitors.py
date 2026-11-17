#!/usr/bin/env python3
"""把 ntfy 频道里最近 12 小时的访客消息累积进 assets/data/visits.json。

ntfy 免费频道只保留 12 小时消息，所以要定时把消息搬运到仓库里的累计文件，
这样站点才能展示「累计」的访问量 / 访客数 / 来源分布。

由 .github/workflows/visitor-snapshot.yml 每小时执行一次。
"""

import json
import os
import re
import sys
import urllib.request

TOPIC = "windgone-visitors-2f8a1c"
NTFY_URL = "https://ntfy.sh/%s/json?poll=1&since=12h" % TOPIC
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(ROOT, "assets", "data", "visits.json")

MAX_SEEN = 5000


def normalize_location(z, p, c):
    """消息里的 z 可能是「中国<TAB>省<TAB><TAB>市」这类格式，
    重新切分可以得到更干净的省市；切不出来再退回上报的 p / c。"""
    parts = [x for x in re.split(r"[\s\u2013\u2014-]+", (z or "").strip()) if x]
    if len(parts) >= 2 and parts[0].startswith("中国"):
        prov = parts[1]
        city = parts[2] if len(parts) > 2 else ""
        return prov, (city or prov)
    city = re.sub(r"\s+(Shi|City|Xian|County)$", "", (c or ""), flags=re.I)
    return (p or ""), city


def empty_state():
    return {
        "total": 0,
        "visitors": 0,
        "countries": {},
        "cities": {},
        "pages": {},
        "last_time": 0,
        "vids": [],
        "seen": [],
    }


def fetch_messages():
    req = urllib.request.Request(
        NTFY_URL, headers={"User-Agent": "wind-gone-visitor-snapshot/1.0"}
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        raw = resp.read().decode("utf-8", "replace")

    messages = []
    for line in raw.splitlines():
        line = line.strip()
        if not line:
            continue
        try:
            item = json.loads(line)
        except ValueError:
            continue
        if item.get("event") != "message":
            continue
        try:
            payload = json.loads(item.get("message") or "{}")
        except ValueError:
            continue
        messages.append(
            {
                "id": item.get("id") or "",
                "time": int(item.get("time") or 0),
                "e": payload.get("e") or "",
                "z": payload.get("z") or payload.get("n") or "",
                "p": payload.get("p") or "",
                "c": payload.get("c") or "",
                "v": payload.get("v") or "",
                "u": payload.get("u") or "",
            }
        )
    return messages


def main():
    state = empty_state()
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, encoding="utf-8") as fh:
                state.update(json.load(fh))
        except ValueError:
            print("warn: visits.json 解析失败，重新开始累计")

    seen = set(state.get("seen") or [])
    vids = list(state.get("vids") or [])

    messages = fetch_messages()
    added = 0

    for msg in messages:
        mid = msg["id"]
        if not mid or mid in seen:
            continue

        seen.add(mid)
        added += 1
        state["total"] = int(state.get("total") or 0) + 1

        if msg["e"]:
            state["countries"][msg["e"]] = state["countries"].get(msg["e"], 0) + 1
        prov, city = normalize_location(msg["z"], msg["p"], msg["c"])
        city = city or prov
        if city:
            state["cities"][city] = state["cities"].get(city, 0) + 1
        if msg["u"]:
            state["pages"][msg["u"]] = state["pages"].get(msg["u"], 0) + 1
        if msg["v"] and msg["v"] not in vids:
            vids.append(msg["v"])
        if msg["time"] > int(state.get("last_time") or 0):
            state["last_time"] = msg["time"]

    state["vids"] = vids
    state["visitors"] = len(vids)
    state["seen"] = list(seen)[-MAX_SEEN:]
    state["countries"] = dict(sorted(state["countries"].items(), key=lambda kv: -kv[1]))
    state["cities"] = dict(sorted(state["cities"].items(), key=lambda kv: -kv[1]))
    state["pages"] = dict(sorted(state["pages"].items(), key=lambda kv: -kv[1]))

    os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
    with open(DATA_FILE, "w", encoding="utf-8") as fh:
        json.dump(state, fh, ensure_ascii=False, separators=(",", ":"))

    print(
        "新增 %d 条；累计 %d 次访问、%d 位访客、%d 个国家/地区"
        % (added, state["total"], state["visitors"], len(state["countries"]))
    )


if __name__ == "__main__":
    sys.exit(main())
