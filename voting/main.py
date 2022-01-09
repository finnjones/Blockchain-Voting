import asyncio
import dazl


async def main():
    async with dazl.connect(url='https://ayze51vr8lgt2m6i.daml.app', act_as='Alice') as client:
        contract = { 'issuer' : 'Alice', 'owner' : 'Alice', 'name' : 'hello world!' }
        await client.create('Main:Asset', contract)

# Python 3.7+
asyncio.run(main())

# # Python 3.6+
# loop = asyncio.get_event_loop()
# loop.run_until_complete(main())