from pathlib import Path
from aider.coders import Coder
from aider.models import Model
import sys

def bump_version(bump_type: str = "patch"):
    """
        Bump the project version using aider API.
        Args:
            bump_type: Type of version bump ('patch', 'minor', or 'major')
    """
    if bump_type not in ("patch", "minor", "major"):
        raise ValueError ("bump_type must be 'patch', 'minor', or 'major'")

    # Get the project root directory
    pyproject_path = Path. cwd() / "pyproject. toml"

    if not pyproject_path.exists():
        raise FileNotFo ndError(
        "pyproject. toml not found in current directory - move to the root of the project"
        )

    # Initialize big three: context, prompt, and model
    context_editable = [str(pyproject_path)]

    context_read_only = ["README.md'"]

    prompt = f"{bump_type} bump pyproject.toml version number."

    model = Model ("gpt-40")

    # Initialize AI Coding Assistant
    coder = Coder. create(
        main_model=model,
        frames= context_editable,
        read_only_fnames=context_read_only,
        auto_commits=False,
        suggest_shell_commands=False,
    )

# Run the version bump
coder.run (prompt)
if __name__ == "__main__":
    bump_type = sys.argv[1] if len(sys.argv) > 1 else "patch"
    bump_version(bump_type)