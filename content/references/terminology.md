---
title: "反物质维度MOD Wiki:术语表"
description: "MOD、AGP、ABI、shadow、J8 等术语"
tags:
  - reference
---

# 术语表

| 术语 | 含义 |
| --- | --- |
| Oreki Edition | MOD 产品名 |
| 官方基线 | 官方 Android 3.21.0 APK / Web 冻结上游 |
| AGP | Android Gradle Plugin，本工程 9.5.1 |
| shadow 类 | 官方 Kotlin 类被改名为 oreki/shadow/kotlin/** 的副本 |
| ABI | 二进制接口（类名、方法/字段描述符、继承关系） |
| J8 混合 | enjarify 基线 + 8 类 dex2jar 热路径替换（R113 用 6 类子集） |
| livelock | 线程持续空转、逻辑不推进（非死锁） |
| Signature 回填 | 恢复泛型签名供 Gson 使用 |
| 夹具 | 用于验收的合法存档样本 |
| 门禁 | Candidate / Verify / Release 受保护检查 |
| 四渠道 | GitHub Releases、OneDrive、Google Drive、本地 SFTP |

## 相关

[[project-overview]] · [[kotlin-runtime]] · [[saves]]
