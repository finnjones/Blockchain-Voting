from setuptools import setup

setup(name='bot',
      version='1.0.0',
      description='Car-Info Bot',
      author='Knoldus Inc.',
      license='Apache2',
      install_requires=['dazl'],
      packages=['main'],
      include_package_data=True)