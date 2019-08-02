.PHONY: help prepare-dev test lint run
.DEFAULT_GOAL := help

define BROWSER_PYSCRIPT
import webbrowser, sys

webbrowser.open(sys.argv[1])
endef
export BROWSER_PYSCRIPT

BROWSER := python -c "$$BROWSER_PYSCRIPT"

define PRINT_HELP_PYSCRIPT
import re, sys

for line in sys.stdin:
	match = re.match(r'^([a-zA-Z_-]+):.*?## (.*)$$', line)
	if match:
		target, help = match.groups()
		print("%-20s %s" % (target, help))
endef
export PRINT_HELP_PYSCRIPT

clean: ## Remove log file.
	rm -rf logs/**.log logs/**.json build

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)
