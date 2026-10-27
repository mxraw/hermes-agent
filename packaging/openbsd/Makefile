COMMENT =		self-improving AI agent

# Not on PyPI as a release tarball this tree can pin. Point DISTFILES at the
# commit that contains the OpenBSD host support before submitting this port.
# GH_ACCOUNT =	NousResearch
# GH_PROJECT =	hermes-agent
# GH_COMMIT =	<openbsd-first-party>

DISTNAME =		hermes-agent-0.0.0
PKGNAME =		hermes-agent-0.0.0

CATEGORIES =		misc

HOMEPAGE =		https://github.com/NousResearch/hermes-agent

# MIT
PERMIT_PACKAGE =	Yes

MODULES =		lang/python

# hatchling is what pyproject.toml declares. Do not run install.sh or uv.
MODPY_PYBUILD =		hatchling

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

# devel/py-pydantic is 2.12.5 and pulls pydantic-core 2.41.5. Hermes records
# that core as segfaulting on the OpenAI path. Do not add it until a newer
# core builds on OpenBSD's Python 3.14. pydantic 2.14.1's sdist does not:
# maturin 1.15 rejects SOABI cpython-314.
BROKEN =		pydantic-core has no OpenBSD py3.14 build

NO_TEST =		Yes

# No rc.d script. Each user runs `hermes gateway install`.
# `hermes gateway install --system` is root's crontab, running as that user.

.include <bsd.port.mk>
