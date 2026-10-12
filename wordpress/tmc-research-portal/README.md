# TMC Research Portal — UKM staging package

Prepared 13 October 2026. The package contains the production build, a WordPress page template, editable project/publication/news records, and the public cohort information collection.

## Install on a private staging copy

1. UKM administrator verifies a backup of the current database, themes, plugins and media. Record the restore procedure, current homepage and menu settings.
2. Plugins → Add New → Upload Plugin: install `tmc-research-wordpress-2026-10-13.zip`, then activate **TMC Research Portal**. The existing theme and old pages remain available.
3. Tools → TMC Research Import → **Import snapshot as drafts**. This creates 22 projects and 68 distinct publications. Repeat import skips existing records.
4. Review drafts in TMC Projects and TMC Publications. Title/description use the WordPress editor. Labelled fields hold targets, periods, collaborators, funding, DOI and links. Study components have individual fields. Publish approved records. Drafts remain private; current participant counts remain withheld.
5. Create a staging Page and choose the **TMC Research Portal** template. Initially it displays the prepared public preview snapshot. Once managed publication starts, only published CMS records are displayed. Preview and test before changing a homepage or menu.
6. Create approved stories in **TMC Research News**. Title, body, category, date and introduction are editable. Historic TMC news remains available in the separately preserved archive.
7. Test images, PDFs, EN/BM, filters, reset, empty states, Back/Forward and direct project links at the proposed UKM URL. Use the acceptance sheet in the handover pack.
8. UKM approves the final research URL and any homepage/menu change. This research project must not silently replace the separate Official TMC site or unrelated `/ms/` pages.

## Editing boundaries

The three research record types are editable in WordPress. Existing UKM news, staff and galleries retain their original dashboard sections and active theme. The copied Introduction and historic public-information pages in `build/cohort/` are static snapshots; rebuilding the package updates them. This is not an automatic bidirectional connection to every legacy UKM post type.

## Rollback

Restore the previous homepage/menu settings and deactivate this plugin to return to the old pages and theme. Deactivation does not delete imported records. Restore the full verified database/files backup if a wider change affected content. Keep old themes, plugins, media and records during changeover.

## Preparation evidence

The local fixture checks 90 draft imports, repeat-import idempotency, draft exclusion, 22 published projects, 68 publications, CMS snapshot updates, invalid nonce rejection and withholding current participant figures. Real UKM WordPress/version/theme/plugin compatibility and final URL testing remain administrator acceptance gates.
