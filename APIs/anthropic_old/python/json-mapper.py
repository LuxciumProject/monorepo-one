import json
import os
# Define a function to analyze the JSON structure
def analyze_json_structure(file_path):
    """
    This function will open a JSON file and try to read it incrementally to infer its structure.
    The structure will be stored in a dictionary format.
    """
    # Placeholder for the JSON structure
    structure = {}

    # Helper function to recursively document the structure
    def recurse_through_structure(obj, structure_dict):
        if isinstance(obj, dict):
            for key, value in obj.items():
                # If key is not already in the structure dictionary, add it with an empty dict
                if key not in structure_dict:
                    structure_dict[key] = {}
                recurse_through_structure(value, structure_dict[key])
        elif isinstance(obj, list):
            # Use a placeholder for items in lists to denote that it's an array of items
            if '[]' not in structure_dict:
                structure_dict['[]'] = {}
            # Generally, JSON arrays contain objects of similar structure,
            # so we can analyze the first item to infer the structure for the rest
            if len(obj) > 0:
                recurse_through_structure(obj[0], structure_dict['[]'])
        # For basic data types, just mark the type
        else:
            structure_dict['type'] = type(obj).__name__

    # Open the file and incrementally parse it
    with open(file_path, 'r', encoding='utf-8') as file:
        try:
            # This will only work if the JSON file contains an object at the root
            data = json.load(file)
            recurse_through_structure(data, structure)
        except json.JSONDecodeError as e:
            print(f"JSONDecodeError: {e}")
            return None
    return structure

# Test the function with one of the smaller JSON files to ensure it works as expected
extract_path = '/home/luxcium/Téléchargements/730a31db355493e70b4f8c235275dd47cb35cce6a081d84eed4e5b174e7b27e3-2024-03-29-05-06-07'
sample_file_path = os.path.join(extract_path, 'shared_conversations.json')
sample_structure = analyze_json_structure(sample_file_path)
print(json.dumps(sample_structure, indent=2))
