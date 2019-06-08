"""
Main function to execute scripts. In the command line, execute like:
>> (CUDA_VISIBLE_DEVICES=X,X) python run.py -f xxx
Where xxx is the name of the YAML config file without the .yaml extension
"""

import importlib
import sys
import time

import yaml


def main(file_name):
    file_path = 'config_files/' + file_name + '.yaml'
    with open(file_path, 'r') as file:
        options_yaml = yaml.load(file)
    module = importlib.import_module(options_yaml['file'])
    start = time.time()
    try:
        module.main(options=options_yaml['args'])
        elapsed_time = time.time() - start
        print(f'Elapsed time: {elapsed_time:.02f}')
    except KeyboardInterrupt:
        print('You decided to stop the simulation.')
    # except Exception as e:
    #     print(e)


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser('run')
    parser.add_argument('-f', '--file', dest='file', default='')
    args = parser.parse_args()
    sys.argv[1:] = []  # Not to mess up with the called scripts
    main(args.file)
