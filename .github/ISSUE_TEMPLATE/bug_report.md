---
name: "🐛 バグ報告 (Bug Report)"
about: "不具合や予期せぬ挙動の報告と修正"
title: "fix: "
labels: ["bug"]
assignees: []
---

## 📌 不具合の概要
<!-- 発生している事象を簡潔に記載してください -->

## 🔍 再現手順 (Steps to Reproduce)
1. 
2. 
3. 

## ⚠️ 期待される挙動 vs 実際の挙動
- **期待**: 
- **実際**: 

## 🛡️ 回帰防止策 (Regression Prevention)
<!-- 再発を防ぐための単体テスト追加方針を記載 -->
- [ ] `tests/` 配下に再現ケースおよび回帰防止テストを追加
- [ ] `npm run check` が全件合格すること
