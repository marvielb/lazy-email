{
  description = "Lazy Email - Angular 15 email automation app";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        version = (builtins.fromJSON (builtins.readFile ./package.json)).version;
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs_20
          ];

          shellHook = ''
            echo "Lazy Email Development Environment"
            echo "Node.js: $(node --version)"
            echo "npm: $(npm --version)"
            echo ""
            echo "To build with secrets, create build.nix file:"
            echo "let"
            echo "  flake = builtins.getFlake \"/path/to/lazy-email\";"
            echo "  system = \"x86_64-linux\";"
            echo "in"
            echo "  flake.packages.${system}.lazy-email.override {"
            echo "    secrets = {"
            echo "      googleClientId = \"your-google-client-id\";"
            echo "      googleApiKey = \"your-google-api-key\";"
            echo "      gmailDiscoveryDoc = \"your-gmail-discovery-doc\";"
            echo "    };"
            echo "  }"
            echo ""
            echo "Then run: nix build --file build.nix"
          '';
        };

        packages = {
          lazy-email = pkgs.lib.makeOverridable
            ({ secrets ? { } }:
              let
                # Default empty secrets (will fail if not overridden)
                defaultSecrets = {
                  googleClientId = "";
                  googleApiKey = "";
                  gmailDiscoveryDoc = "";
                };
                finalSecrets = defaultSecrets // secrets;
              in
              pkgs.buildNpmPackage {
                pname = "lazy-email";
                version = version;
                src = ./.;
                npmBuildScript = "build:prod";
                npmDepsHash = "sha256-C6F00Zg8nREcNh+MabzQfdrLp4VcDVqKZiLbpF6qs0g=";

                preBuild = ''
                  # Create production environment file with secrets
                  cat > src/environments/environment.ts << 'EOF'
                  export const environment = {
                    googleClientId: '${finalSecrets.googleClientId}',
                    googleApiKey: '${finalSecrets.googleApiKey}',
                    gmailDiscoveryDoc: '${finalSecrets.gmailDiscoveryDoc}',
                  };
                  EOF
                '';

                postInstall = ''
                  # Copy VERSION file
                  echo "Lazy Email v${version}" > $out/VERSION
                  cp -r dist/frontend/* $out/
                  rm -r $out/lib
                '';
              })
            { };

          # Default package shows error message (forces explicit secret provision)
          default = pkgs.writeText "error" ''
            This package requires secrets to be provided via override.

            Usage:
              nix build --file build.nix

            Where build.nix contains:
              let
                flake = builtins.getFlake "/path/to/lazy-email";
                system = "x86_64-linux";
              in
                flake.packages.${system}.lazy-email.override {
                  secrets = {
                    googleClientId = "your-google-client-id";
                    googleApiKey = "your-google-api-key";
                    gmailDiscoveryDoc = "your-gmail-discovery-doc";
                  };
                }
          '';
        };
      });
}
