COMMENT =		self-improving AI agent

DISTNAME =		hermes-agent-0.0.0
PKGNAME =		hermes-agent-0.0.0

# First package omitted the share tree. Same DISTNAME, different contents.
REVISION =		4

CATEGORIES =		misc

HOMEPAGE =		https://github.com/NousResearch/hermes-agent

# MIT
PERMIT_PACKAGE =	Yes

# Not an upstream release. Put ${DISTNAME}.tar.gz in ${DISTDIR}
# before building. Do not point SITES at a home directory.
# The tarball is this branch plus prebuilt hermes_cli/web_dist and
# hermes_cli/tui_dist. Those directories are build products, gitignored
# upstream, and are not committed here.
FETCH_MANUALLY += "${DISTNAME}.tar.gz must be placed in ${DISTDIR}."
FETCH_MANUALLY += "It is a tarball of this branch plus hermes_cli/web_dist and hermes_cli/tui_dist, not a published release."

MODULES =		lang/python

# pyproject.toml build-backend is setuptools.build_meta, not hatchling.
MODPY_PYBUILD =		setuptools

# setup.py refuses wheel builds except the Nix packaging path.
MAKE_ENV +=		HERMES_NIX_BUILD=1

SHARE_DIRS =		skills optional-skills plugins locales optional-mcps

post-install:
	${INSTALL_DATA_DIR} ${PREFIX}/share/hermes-agent
	${INSTALL_DATA_DIR} ${PREFIX}/libexec/hermes-agent
.for d in ${SHARE_DIRS}
	cp -R ${WRKSRC}/${d} ${PREFIX}/share/hermes-agent/
	find ${PREFIX}/share/hermes-agent/${d} -name __pycache__ -type d -prune -exec rm -rf {} +
.endfor
.for b in hermes hermes-agent hermes-acp
	mv ${PREFIX}/bin/${b} ${PREFIX}/libexec/hermes-agent/${b}
.endfor
	${INSTALL_SCRIPT} ${FILESDIR}/hermes.sh ${PREFIX}/bin/hermes
	${INSTALL_SCRIPT} ${FILESDIR}/hermes.sh ${PREFIX}/bin/hermes-agent
	${INSTALL_SCRIPT} ${FILESDIR}/hermes.sh ${PREFIX}/bin/hermes-acp
	${INSTALL_DATA_DIR} ${PREFIX}/share/examples/hermes-agent
	${INSTALL_DATA} ${FILESDIR}/pf.conf ${PREFIX}/share/examples/hermes-agent/pf.conf
	# Dashboard SPA and embedded terminal. The distfile carries prebuilt
	# hermes_cli/web_dist and hermes_cli/tui_dist. Chat runs the TUI with Node.
	${INSTALL_DATA_DIR} ${PREFIX}/lib/python${MODPY_VERSION}/site-packages/hermes_cli/web_dist
	cp -R ${WRKSRC}/hermes_cli/web_dist/. ${PREFIX}/lib/python${MODPY_VERSION}/site-packages/hermes_cli/web_dist/
	${INSTALL_DATA_DIR} ${PREFIX}/lib/python${MODPY_VERSION}/site-packages/hermes_cli/tui_dist
	cp -R ${WRKSRC}/hermes_cli/tui_dist/. ${PREFIX}/lib/python${MODPY_VERSION}/site-packages/hermes_cli/tui_dist/

# Local terminal commands are bash, not ksh. bash is not in base.
RUN_DEPENDS =		shells/bash \
			lang/node \
			security/py-scrypt \
			devel/py-certifi \
			devel/py-openai \
			devel/py-pathspec \
			devel/py-prompt_toolkit \
			devel/py-ptyprocess \
			devel/py-rich \
			devel/py-tenacity \
			graphics/py-Pillow \
			net/py-websockets \
			security/py-cryptography \
			security/py-truststore \
			sysutils/py-croniter \
			sysutils/py-dotenv \
			sysutils/py-packaging \
			sysutils/py-psutil \
			textproc/py-markdown \
			textproc/py-ruamel.yaml \
			textproc/py-snowballstemmer \
			textproc/py-tomli_w \
			www/py-fastapi \
			www/py-httptools \
			www/py-httpx \
			www/py-jinja2 \
			www/py-jwt \
			www/py-python-multipart \
			www/py-requests \
			www/py-urllib3 \
			www/py-uvicorn

# Use the release tree's py3-pydantic (2.12.5 / core 2.41.5), pulled in by
# py3-openai. Hermes pins 2.14.1 because that core has segfaulted on the
# Responses path. 8.0 is frozen, and this port does not replace an existing
# port. A model call gets the tree's pydantic; that crash is accepted.

NO_TEST =		Yes

# No rc.d script. Each user runs `hermes gateway install`.
# `hermes gateway install --system` is root's crontab, running as that user.

.include <bsd.port.mk>
