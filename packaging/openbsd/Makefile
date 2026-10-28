COMMENT =		self-improving AI agent

DISTNAME =		hermes-agent-0.0.0
PKGNAME =		hermes-agent-0.0.0

CATEGORIES =		misc

HOMEPAGE =		https://github.com/NousResearch/hermes-agent

# MIT
PERMIT_PACKAGE =	Yes

# Local distfile of the OpenBSD branch. Not an upstream release.
SITES =			file:///home/raw/distfiles/

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

# Local terminal commands are bash, not ksh. bash is not in base.
RUN_DEPENDS =		shells/bash \
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

# devel/py-pydantic is 2.12.5 (pydantic-core 2.41.5), which Hermes records
# as segfaulting on the OpenAI path. 2.14.1 does not build on this Python
# yet. Left out until a core exists. The CLI help path did not import it.

NO_TEST =		Yes

# No rc.d script. Each user runs `hermes gateway install`.
# `hermes gateway install --system` is root's crontab, running as that user.

.include <bsd.port.mk>
