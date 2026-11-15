---
title: "存档兼容排查"
description: "读档失败、字段类型漂移与静默重置的排查"
tags:
  - troubleshooting
  - savestate
---

# 存档兼容排查

## 症状与原因

| 症状 | 常见原因 |
| --- | --- |
| 读出后资源/阶段异常 | Gson 泛型缺失导致类型漂移（见 [[signature-backfill]]） |
| 读档后静默重置 | 反序列化异常被吞或字段类型不符 |
| 注入真实存档后冻结 | 混合运行时 livelock（见 [[coroutine-abi]]） |
| 不写档 | tick 停止 / 保存调度未触发 |

## 排查步骤

1. 确认存档注入方式：必须用 app uid/gid 注入，否则会静默回退新游戏。
2. 对照 SHA：注入前后 player.json 的 SHA 是否变化。
3. 检查 playerBackup 文件是否生成。
4. logcat 查 Gson 异常、NoSuchField/Method、FATAL。
5. 用 smali 稳定版做对照。

## 禁止

- 不得手工生成 player JSON 冒充自动存档。
- 不得把损坏存档当正常夹具。
- 不得覆盖用户真实存档。

## 证据

状态：已验证（部分路径）
证据等级：实测
来源 Commit：ae734966bf712faca3ff7bbb389d8724a8efe7e5

## 相关

[[saves]] · [[signature-backfill]] · [[coroutine-abi]]
