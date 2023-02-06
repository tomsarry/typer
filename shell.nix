{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
    nativeBuildInputs = with pkgs; [
      nodejs-18_x
    ];

    shellHook = ''
      echo "Typer nix-shell"

      # format
      alias lint="npm run lint"
      alias format="npm run format"
      alias run="npm run dev -- --open"
    '';
}
