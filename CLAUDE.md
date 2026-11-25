# task-board

React + Vite（JavaScript）製のタスクボードアプリ。タスクの追加・完了切替・削除ができる。

## コマンド

- 開発サーバー: `npm run dev`（http://localhost:5173）
- ビルド: `npm run build`（出力先 `dist/`。生成物なので編集しない）
- テスト・Lint・型チェックは未導入。

## アーキテクチャ

- タスク一覧の状態は [src/App.jsx](src/App.jsx) の `useState` で一元管理し、子コンポーネントへはコールバックで渡す。
- タスクは localStorage（キー `task-board:tasks`）に保存する。読み書きは [src/taskStorage.js](src/taskStorage.js) に集約し、読み込み時は形の不正な要素を捨てる。
- タスク ID は `crypto.randomUUID()`。安全なコンテキスト（localhost / HTTPS）でのみ動くため、LAN 内の別端末から http で開くと追加時に落ちる。
- スタイルは [src/App.css](src/App.css) の素の CSS 1 ファイル。

## 言語

- 対話・コード内コメント・コミットメッセージは **すべて日本語** で記述する。
- 識別子（変数名・関数名・クラス名）とファイル名は英語のままにする。

## Git 運用

- ブランチ運用はグローバルルール（`~/.claude/CLAUDE.md`）に従う。
  コード編集前に `main` から作業ブランチ（`feature/` `fix/` など）を切る。
- **コードを変更するたびに、コミットして GitHub へプッシュする。**
  - 意味のある変更単位ごとに日本語メッセージでコミットし、続けて `git push -u origin <作業ブランチ>` を実行する。
  - このプロジェクトでは、作業ブランチへの push に限り **毎回の確認は不要**（グローバルルールの「push 前に確認」をこのプロジェクトでは上書きする）。
  - push 先は作業ブランチのみ。`main` / `master` への直接 push・`--force` / `--force-with-lease` は禁止のまま。
  - `main` への反映は Pull Request 経由で行う。
  - リモート未設定・認証エラーで push できない場合は、コミットまで行い、その旨を報告する。
- push 前に、`.env` や認証情報がステージされていないか `git status` で確認する。

## セキュリティ

- `.env` および認証情報を含むファイルは **絶対にコミットしない**。
  `.gitignore` に入っていることを確認し、無ければ追加する。
- 秘密情報は値をこのファイルにも書かない。変数名だけを書き、値は `.env.example` に
  プレースホルダとして置く。
- API キー・トークン・パスワードをソースにハードコードしない。
