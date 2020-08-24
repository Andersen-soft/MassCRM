# Name

Andersen CRM Marketing

# About us

Andersen CRM Marketing is the system developed for working with a customer database in order to optimize the business processes of the marketing Department. Our system let users:

- create contacts
- import contacts from the file
- easy access to contact data
- using filters and sorts
- export data

# Technologies

* Laravel 7.0
* PHP 7.4
* Postgres 10.8
* Redis
* React 16.12
* TS 3.7

# Installation

 - To start deployment just clone the repo
 - After that modify .env files in directories masscrm_back and masscrm_front
    - example [.env.local](./masscrm_front/.env.local) for front
    - example backend of .env file in [.env.local](./masscrm_back/.env.local) for back

Local build and deploy requires Linux OS, docker version >= 19.03.12 and docker-compose version >= 1.25.3 installed. Local build was tested at Ubuntu 18; Windows and MacOS are compatibility not guaranteed.
  
To start the application please use the following command:

```text
bash up.sh
```
During the execution of this command, the following operations are performed:
1. pull and up docker containers.
2. install dependencies via Composer.
3. migrations execution.
4. start webSocket server.
5. install dependencies via frontend

Generating key JWT and application. Creating list of users, contacts, companies and etc.

```text
bash 1stlocalrun.sh
```

File down.sh gives you an ability to stop the project and change owner of logs folder to current user for cleaning. It  destroys previously created docker network, so sudo password will be promted for it and owner changeng.

```text
bash down.sh
```

# Environments

1. [Frontend](#frontend)
2. [Backend](#backend)

   ## Frontend
    - REACT_APP_MASS_CRM_BASE_URL - url of your api to connect to
    - WS_URL - ws://localhost:8090 - url of the webSocket server

   ## Backend
    - APP_URL_FRONT_END - url of your frontend 
    - APP_URL_SSO_AUTH_SERVER - url of your SSO server

# Support

If you have something to tell (ask for help, gain extra explanations, propose changes, leave a feedback еtс.), please contact us by e-mail [masscrm.support@andersenlab.com](mailto:masscrm.support@andersenlab.com).

# Roadmap

Our project is on the way to perfection. Thats's why time to time we have updates and releases, as well as improvements and bug fixes. We will keep you in touch by release notes and announcements.

# Contributing

Andersen CRM Marketing is open for your proposals. The project source code repositories are hosted at GitHub. All proposed changes are submitted and code reviewed using the _GitHub Pull Request_ process.

To submit a pull request:

1. Commit changes and push them to your fork on GitHub. It is a good practice to create branches instead of pushing to master.
2. In GitHub Web UI click the _New Pull Request_ button.
3. Select \_\_\_\_\_ as _base fork_ and `master` as base, then click _Create Pull Request_.
4. Fill in the Pull Request description.
5. Click _Create Pull Request_.
6. Select reviewers: _Front_ _Back_
7. Wait for CI results/reviews, process the feedback.

All contributions are considered as original BSD unless it's explicitly stated otherwise.

We require pull request submitters to sign the contributor agreement. Please downloand the Agreement, complete it and sign, then scan and email a pdf file to [masscrm.legal@andersenlab.com](mailto:masscrm.legal@andersenlab.com).

- [ICLA: Individual Contributor License Agreement](./ICLA%20CRM%20Marketing.pdf)
- [CCLA: Corporate Contributor License Agreement](./CCLA%20CRM%20Marketing.pdf)

Once your Pull Request has passed the rewiew and it's ready to be merged, it will be included in upcoming release.

# Authors and acknowledgment

Show your appreciation to those who have contributed to the project.

# License

Andersen CRM Marketing [BSD licensed](./LICENSE)

# Project status

If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.
