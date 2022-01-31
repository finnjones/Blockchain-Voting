import asyncio
import dazl

async def main():
    async with dazl.connect(url='localhost:6865', read_as='Alice') as conn:
        print("test")
        async with conn.query('*') as stream:
            print("test")
            async for event in stream.creates():
                print("test")
                print(event.contract_id, event.payload, "hello")

# Python 3.7+ or later
asyncio.run(main())