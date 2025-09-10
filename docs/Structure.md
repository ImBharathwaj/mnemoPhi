mnemoPhi/
│
├── backend/                            # Scala backend (modular monolith)
│   ├── build.sbt                        # Scala/SBT build configuration
│   ├── project/                         # sbt project files
│   │   └── plugins.sbt
│   │
│   ├── modules/                         # Modular services
│   │   ├── consent/                     # ConsentService
│   │   │   ├── src/main/scala/com/mnemoPhi/consent/
│   │   │   │   ├── ConsentController.scala
│   │   │   │   ├── ConsentService.scala
│   │   │   │   ├── ConsentRepository.scala
│   │   │   │   └── ConsentModels.scala
│   │   │   └── src/test/scala/com/mnemoPhi/consent/
│   │   │       └── ConsentServiceTest.scala
│   │   │
│   │   ├── user/                        # UserService
│   │   │   ├── src/main/scala/com/mnemoPhi/user/
│   │   │   └── src/test/scala/com/mnemoPhi/user/
│   │   │
│   │   ├── client/                      # ClientService (business accounts)
│   │   │   ├── src/main/scala/com/mnemoPhi/client/
│   │   │   └── src/test/scala/com/mnemoPhi/client/
│   │   │
│   │   └── common/                      # Shared models, utils, error handling
│   │       ├── src/main/scala/com/mnemoPhi/common/
│   │       └── src/test/scala/com/mnemoPhi/common/
│   │
│   ├── main/                            # Entry point for server
│   │   └── scala/com/mnemoPhi/Main.scala
│   │
│   ├── resources/                       # Config files, log configs
│   │   ├── application.conf
│   │   └── logback.xml
│   │
│   ├── scripts/                         # DB migration, utility scripts
│   │   └── init-db.sql
│   │
│   ├── docs/                            # API docs, architecture docs
│   │   └── api-specs/
│   │       └── openapi.yaml
│   │
│   └── tests/                           # Integration tests
│       └── ConsentIntegrationTest.scala
│
├── frontend/                            # React/Next.js frontend
│   ├── dashboard/                        # Business dashboard
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/                 # API service calls
│   │   │   └── styles/
│   │   ├── public/
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── userPage/                         # User consent / preference page
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/                 # API calls to backend
│   │   │   └── styles/
│   │   ├── public/
│   │   ├── package.json
│   │   └── README.md
│   │
│   └── shared/                           # Shared components / utilities
│       ├── components/
│       ├── hooks/
│       ├── utils/
│       └── styles/
│
├── docker/                               # Docker configs for local dev
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   └── docker-compose.yml
│
├── scripts/                              # Root-level scripts (setup, deploy, etc.)
│   ├── start-all.sh                       # Starts backend + frontend locally
│   └── seed-db.sh
│
├── tests/                                # End-to-end tests (Cypress / Playwright)
│   ├── e2e-dashboard/
│   └── e2e-userPage/
│
├── .gitignore
├── README.md
└── LICENSE
