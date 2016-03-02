include config.mk

NAME = brdf

ARCHIVE_CONTENTS += meta.json
ARCHIVE_CONTENTS += $(wildcard *.lua **/*.lua)
ARCHIVE_CONTENTS += $(wildcard *.vert **/*.vert)
ARCHIVE_CONTENTS += $(wildcard *.frag **/*.frag)

XCF_FILES = $(shell find . -name '*.xcf')
GENERATED_CONTENTS += $(patsubst %.xcf,%.png,$(XCF_FILES))

BLEND_FILES = $(shell find . -name '*.blend')
GENERATED_CONTENTS += $(patsubst %.blend,%.json,$(BLEND_FILES))

GENERATED        += $(GENERATED_CONTENTS)
ARCHIVE_CONTENTS += $(GENERATED_CONTENTS)

include $(BUILD_TOOLS)/rules.mk
