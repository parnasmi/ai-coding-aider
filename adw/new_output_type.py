from pathlib import Path
from py_compile import main
from aider.coders import Coder
from aider.models import Model
import sys

def new_output_type(description: str):
    """
    Create a new output type based on the given description.
    Args:
        description (str): Description of the new output type to generate.
    """

    pyproject_path = Path.cwd() / "pyproject.toml"
    if not pyproject_path.exists():
        raise FileNotFoundError(
            "pyproject.toml not found in current directory - move to the root of the project"
        )

    # Setup BIG THREE: context, prompt, and model

    # Files to be edited
    context_editable = [
    "src/aider_has_a_secret/main.py",
    "src/aider_has_a_secret/output_format.py",
    ]
    
    # Files that are read-only references
    context_read_only = ["src/aider_has_a_secret/data_types.py", str(pyproject_path)]

    # Define the prompt for the AI model
    prompt = f"""
    UPDATE output_format.py:
        ADD a new output format to the application based on the following description: '{description}'

    UPDATE main.py:
        UPDATE the main.py file to support the new output type and save with the correct extension of the new output type.

    """
    # Initialize the AI model
    model = Model("claude-3-5-sonnet-20241022")

    # Initialize the AI Coding Assistant
    coder = Coder.create(
        main_model=model,
        fnames=context_editable,
        read_only_fnames=context_read_only,
        auto_commits=False,
        suggest_shell_commands=False,
    )

    # Run the code modification
    coder.run(prompt)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python new_output_type.py '«description»'")
        sys.exit(1)
    
    description = sys.argv[1]
    new_output_type(description)