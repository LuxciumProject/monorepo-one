# Questrade API — Project Operating Instructions

ChatGPT and Human User, as a team.
ChatGPT as main executant of user's directives.
Carrier Grade, Professional, and Complete for the banking industry, resilient, reliable.

## 1) What we’re building

A production-grade TypeScript SDK for Questrade: auth → accounts → market data (quotes/options/strategies/candles) → symbols → time → (optional) streaming. Targets Node + Next.js (server). Browser use is read-only market data.

## 2) Sources of truth (use in this order)

1. Our service spec (we’ll maintain a small OpenAPI 3.1 YAML describing Questrade endpoints we support).
2. 24 PDFs below (exact behavior/fields/limits).
3. Official Questrade docs on web (only to clarify gaps; we’ll pull them in-session when needed).

## 3) Session workflow (repeatable)

Kickoff (3–5 min): pick scope (e.g., accounts → balances/positions) and name deliverables (types, client, tests).
Open right files (from list below) and extract shapes/limits into our service spec.
Generate/hand-write TS types + runtime validators (zod/valibot) from spec section we just touched.
Implement client calls with fetch, error mapping, and rate-limit handling.
Write tests (unit + light integration). Save fixtures as contract tests.
Doc module (JSDoc + link to source PDF).
Ship a small example (Node script / Next.js API route).
Log decisions in a short “Decision Log” snippet at end of session.

## 4) Coding rules (non-negotiable)

Strict TS on. ESM + `fetch` (polyfill on Node). Abort after 10s default.
Never hardcode host; always use `api_server` returned by auth.
Respect rate limits (account vs market pools) and retry with headers.
Model latency explicitly (`isRealTime`, `delay`)—don’t assume live quotes.
Activities window: enforce ≤31 days per call; auto-chunk ranges.
Trading endpoints are disabled unless partner scope is explicitly present.
Observability: emit events for retries, rate limits, token refresh.
Docs: JSDoc on every public symbol + link back to exact PDF we used.

## 5) Module plan (build order)

1. Auth (token rotation, `api_server`, scopes guard)
2. Core HTTP (retry/backoff, error mapping, rate buckets)
3. Time → Accounts (accounts/balances/positions/activities)
4. Markets (static) → Symbols (id, search, options chain)
5. Quotes (by id), Options Quotes, Strategies Quotes, Candles
6. Streaming (notifications/L1), opt-in

## 6) File quick-reference (24 PDFs)

Use this as your map. Open these exact file names during session.

### A) REST endpoints (core)

1. GET accounts \_ Rest operations \_ Questrade API.pdf
   Account list + metadata. Use for account selection and scope checks.
2. GET accounts-id-balances \_ Rest operations \_ Questrade API.pdf
   Cash/securities balances; note `isRealTime`.
3. GET accounts-id-positions \_ Rest operations \_ Questrade API.pdf
   Positions, quantities, market values; watch `isRealTime`.
4. GET accounts-id-orders \_ Rest operations \_ Questrade API.pdf
   Historical/open orders. (Trading write ops stay disabled for us.)
5. GET accounts-id-executions \_ Rest operations \_ Questrade API.pdf
   Fills/executions history.
6. GET accounts-id-activities \_ Rest operations \_ Questrade API.pdf
   Ledger/activities. Enforce ≤31 days per request.
7. GET time \_ Rest operations \_ Questrade API.pdf
   Server time (Eastern/ISO). Use to calibrate windowing/clock skew.
8. GET markets \_ Rest operations \_ Questrade API.pdf
   Venues, hours, `snapQuotesLimit` for batch quotes.
9. GET markets-quotes-id \_ Rest operations \_ Questrade API.pdf
   Snapshot quotes by symbol ids; batch within venue limits.
10. GET markets_quotes_options \_ Rest operations \_ Questrade API.pdf
    Options quotes; expose greeks + `delay`.
11. GET markets-quotes-strategies \_ Rest operations \_ Questrade API.pdf
    Multi-leg strategy quotes; model legs + computed greeks.
12. GET markets-candles-id \_ Rest operations \_ Questrade API.pdf
    OHLCV candles. Lock periods/intervals to enumerations.
13. GET symbols-id \_ Rest operations \_ Questrade API.pdf
    Symbol fundamentals/metadata.
14. GET symbols-id-options \_ Rest operations \_ Questrade API.pdf
    Option chain for an underlying; contracts & expiries.
15. GET symbols-search \_ Rest operations \_ Questrade API.pdf
    Search by keywords/tickers; prepare for pagination/filters.

### B) Platform/program docs

1. API Getting started \_ Questrade API \_ Questrade Developer Platform.pdf
   High-level flow; confirms base host discovery (`api_server`).
2. API Authorization \_ Questrade API \_ Questrade Developer Platform.pdf
   Token grant, expiry, refresh rules; scopes.
3. API Security \_ Questrade API \_ Questrade Developer Platform.pdf
   Security posture expectations (token handling, TLS, etc.).
4. API Rate limiting \_ Questrade API \_ Questrade Developer Platform.pdf
   Rate classes (account vs market) and headers to honor.
5. API Error handling \_ Questrade API \_ Questrade Developer Platform.pdf
   Error codes/messages → map to a typed error union.
6. API Streaming \_ Questrade API \_ Questrade Developer Platform.pdf
   Notifications/L1 streaming: port discovery, token send timing, heartbeats.
7. Questrade API \_ Questrade Developer Platform.pdf
   Overview/entry points; cross-check wording for docs links.
8. Enumerations.pdf
   Canonical enums (venues, intervals, security types, order sides, etc.).
9. OpenAPI Specification v3.1.1.pdf
   Reference for our own spec format (not Questrade’s). Use to shape YAML we maintain.

## 7) How we use files (decision tree)

Need an endpoint’s request/response shape? Open its GET … Rest operations PDF first → mirror fields in our YAML → generate types.
Unsure about limits/headers? Open API Rate limiting and endpoint PDF’s notes → wire retry/backoff accordingly.
Latency or “real-time” questions? Check endpoint PDF for `isRealTime` / `delay` flags and carry them through types.
Enums unclear? Open Enumerations.pdf and lock our TS enums to it.
Auth/base host? Open API Authorization and API Getting started.
Streaming? Only when explicitly needed → API Streaming.

## 8) Spec & codegen (our side)

- Create `schema/questrade.openapi.yaml` (OpenAPI 3.1).

  - `paths`: only endpoints we support.
  - `components.schemas`: Account, Balance, Position, Order, Execution, Activity, MarketVenue, VenueHours, Symbol, OptionContract, OptionChain, Quote, OptionsQuote, StrategyLeg, StrategyQuote, Candle, ServerTime, Error.
  - Add `x-doc-source` per schema with exact PDF filename and section anchor.

- Codegen step outputs:

  - `src/types/*.ts` (types),
  - `src/validators/*.ts` (zod/valibot),
  - `src/generated/paths.ts` (request signatures).

## 9) HTTP & errors (one page you’ll keep open)

- Retries: 429 → read reset header and pace; 5xx → jittered backoff; 401 → refresh once; 403 → scope error (fail fast, message from catalog).
- Separate token buckets for account vs market classes.
- Always swap baseURL to `api_server` after auth.

## 10) Tests (what “done” means)

Unit: token rotation, scope guard, error mapping, enum guards.
Integration (mocked): rate-limit pacing; activities ≤31d chunker; baseURL swap.
Contract tests: JSON fixtures per endpoint; only updated via spec change.
Smoke (opt-in live): `/time`, `/accounts`, `/markets`, `/symbols/search`.
