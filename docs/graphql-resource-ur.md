# GraphQL — Kya hai, faiday, differences, aur kab use karein (Roman Urdu + English)

![GraphQL](graphQL%20a%20powerful%20alternative%20to%20traditional%20APIs.png)

Ye document aap ko GraphQL ka quick, practical overview deta hai: GraphQL kya hota hai, yeh kya karta hai, REST/gRPC se kya farq hai, aur kab GraphQL use karna chahiye vs kab dusra approach (REST/gRPC) better hota hai. End par quick examples aur best practices bhi milengi.

---

## GraphQL kya hai?

- GraphQL ek query language aur runtime hai APIs ke liye.
- Client apni zaroorat ke mutabiq “exact” data shape maangta hai (over-fetching/under-fetching kam hota hai).
- Single endpoint hota hai (usually `/graphql`), aur saara data ek strongly-typed schema se drive hota hai.
- Self-documenting: Introspection ki wajah se tools (GraphiQL, Apollo Sandbox) se schema, types, fields sab discover ho jate hain.

### Core Concepts

- Schema (SDL): API ka contract, types aur relationships define karta hai.
- Types: Object types, Scalars (String, Int, ID, Boolean, Float), Enums, Interfaces, Unions, Input types.
- Operations:
  - Query: Read operations
  - Mutation: Write/side-effect operations
  - Subscription: Real-time updates (WebSocket-based)
- Resolver: Function jo batata hai data kahan se laana hai (DB, REST, microservice, etc.).
- Variables: Queries ko dynamic banane ke liye.

---

## Yeh kya karti hai (core benefits)

- Exact data fetching: Jo fields chahiye wahi aate hain, mobile/slow networks pe faida.
- Single round trip: Multiple resources ko ek request mein aggregate kar sakte hain.
- Strong typing: Early feedback, better tooling, safer refactors, codegen.
- No versioning by default: Fields add/remove strategy (deprecations) se evolve hota hai.
- Great DX: GraphiQL/Apollo Sandbox, type-safe clients (Apollo/Relay), auto docs.

---

## Nuqsanat / trade-offs

- Server complexity: Schema, resolvers, dataloader, caching strategy design karna parta hai.
- Caching harder than REST URLs: Field-level ya result-level caching setup karna padta hai.
- N+1 pitfall: Nested resolvers per-record DB hits; DataLoader ya batching zaroori.
- Rate limiting/complexity control: Query depth/complexity limit, timeouts, persisted queries ki zarurat.
- File uploads/streaming: Possible, magar REST/gRPC ke muqablay me extra setup.

---

## GraphQL vs REST vs gRPC (high-level differences)

- GraphQL
  - Flexible data fetching, single endpoint, strong typing.
  - Best for complex UIs, multiple clients (web, mobile), aggregated data from many services.
  - Real-time via Subscriptions.
- REST
  - Resource-based endpoints, simple caching (URLs, status codes), infra/tooling mature.
  - Best for simple CRUD, public APIs, CDN-friendly caching.
- gRPC (RPC over HTTP/2, Protocol Buffers)
  - Super fast, strongly typed, bi-directional streaming.
  - Best for service-to-service (internal) comm, low-latency, high-throughput systems.

---

## Kab GraphQL use karein?

- UI ko multiple aggregates chahiye (e.g., feed + user + notifications ek screen mein).
- Multiple client apps with different data needs (web, iOS, Android, smart devices).
- Network constrained environments (mobile/slow): over-fetching avoid karna ho.
- Rapid iteration aur schema evolution chahiye without breaking clients.
- BFF (Backend for Frontend) pattern: Ek GraphQL layer jo microservices ko aggregate kare.

## Kab REST/gRPC dusra approach better hota hai?

- Simple CRUD or straightforward resources jahan URL-based caching critical hai (REST).
- Public APIs jahan HTTP semantics, status codes, CDN caching helpful ho (REST).
- Internal high-performance service-to-service calls, streaming, strict contracts (gRPC).
- Extremely chatty real-time streaming (market data, telemetry) — gRPC streams/WebSockets.

Short rule of thumb:

- Complex client-facing aggregation = GraphQL
- Simple resource-based API + caching = REST
- Internal high-performance RPC/streaming = gRPC

---

## Architecture patterns

- Gateway/Federation: Multiple subgraphs ko ek unified graph me compose karein (Apollo Federation, Apollo Gateway).
- BFF Layer: Frontend-specific needs ke liye ek GraphQL facade jo downstream services call kare.
- Persisted Queries: Pre-registered queries for security + caching.
- DataLoader: Batch + cache to prevent N+1.

---

## Security & performance best practices

- Query complexity limits: Depth limit, cost analysis, timeouts.
- AuthN/AuthZ: Field-level authorization where needed. Context me user pass karein.
- Caching strategy:
  - Server-side: Response cache, resolver-level cache, DataLoader.
  - Client-side: Apollo Client normalized cache.
- Persisted/whitelisted queries: Prevent arbitrary expensive queries.
- Error handling: Partial data + errors array handle karein; clear error masking.

---

## Apollo ecosystem (quick view)

- Apollo Server: Node.js GraphQL server with schema/resolvers, plugins.
- Apollo Client: Cache, state management, devtools.
- Apollo Federation/Gateway: Multiple services ka unified supergraph.
- Apollo Studio: Schema registry, metrics, checks, tracing.

---

## Quick syntax examples

### 1) SDL (schema)

```graphql
schema {
  query: Query
  mutation: Mutation
}

type Query {
  me: User
  posts(limit: Int = 10): [Post!]!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
}

type User {
  id: ID!
  name: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  body: String
  author: User!
}

input CreatePostInput {
  title: String!
  body: String
}
```

### 2) Query (client side)

```graphql
query GetFeed($limit: Int!) {
  me {
    id
    name
  }
  posts(limit: $limit) {
    id
    title
    author {
      id
      name
    }
  }
}
```

### 3) Mutation

```graphql
mutation CreateOne($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    title
    author {
      id
      name
    }
  }
}
```

### 4) Subscription (real-time)

```graphql
subscription OnPostAdded {
  postAdded {
    id
    title
  }
}
```

---

## Common pitfalls and solutions

- N+1 queries in nested fields → DataLoader/batching.
- Unbounded queries → depth/complexity limits + persisted queries.
- Cache misses → Consistent IDs, normalized caching (Apollo Client), proper typePolicies.
- Large responses → Pagination (cursor-based), field selection discipline.
- Breaking changes → Deprecate fields, add new ones; avoid removing until clients migrate.

---

## Decision guide (quick checks)

- Kya aap ke frontend screens ko multiple backends se data chahiye? → GraphQL.
- Kya simple CRUD + CDN caching zyada important hai? → REST.
- Kya internal services ko low-latency streaming chahiye? → gRPC.
- Kya mobile data usage ko optimize karna critical hai? → GraphQL.
- Kya aap ko real-time UI integrate karna hai existing GraphQL stack me? → GraphQL Subscriptions.

---

## FAQs

- Kya GraphQL database query language hai?
  - Nahi. Yeh API layer ke liye hai; DB SQL/NoSQL ko server-side resolvers handle karte hain.
- Versioning kaise?
  - Typically “no versions”; fields ko deprecate karein, naye add karein, clients migrate.
- File uploads?
  - `graphql-multipart-request-spec` ya REST sidecar endpoint use karein.
- Caching?
  - Client: Apollo normalized cache. Server: response/resolver-level, persisted queries/CDN for GET queries.

---

## Minimal Apollo Server example (conceptual)

```js
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Query { hello: String! }
`;

const resolvers = {
  Query: { hello: () => "Hello GraphQL" },
};

const server = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(server, { listen: { port: 4000 } }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
```

Note: Example is for illustration only (production me auth, validation, limits, logging add karein).

---

## Further learning

- Official: https://graphql.org/learn/
- Apollo Docs: https://www.apollographql.com/docs/
- Spec: https://spec.graphql.org/
- GraphiQL/Apollo Sandbox: Try queries against your schema.

---

Happy building! Agar aap chahen to main is document ko English/Urdu (Nastaliq) me bhi convert kar sakta hoon, ya specific stack (Node, .NET, Java, NestJS) ke examples add kar sakta hoon.
