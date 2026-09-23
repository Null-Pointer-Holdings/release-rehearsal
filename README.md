# release-rehearsal

A stand-in package that Null Pointer Holdings uses to rehearse its release process end to end, in
public: versions and changelogs from changesets, stable and beta channels on npm, a tagged GitHub
release with a one-line installer attached, and publishing with provenance through npm trusted
publishing — no token stored anywhere.

It does nothing useful. `rehearsal` prints its version; `rehearsal check [--channel beta]` asks npm
whether there's a newer one.

```sh
curl -fsSL https://github.com/Null-Pointer-Holdings/release-rehearsal/releases/latest/download/install.sh | sh
```
