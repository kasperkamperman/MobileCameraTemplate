import asyncio

async def async_foo():
    print('before sleep')
    await asyncio.sleep(1)
    print('after sleep')
    return 3

def main():
    loop = asyncio.get_event_loop()
    x = loop.run_until_complete(async_foo())
    print(x)
    loop.close()

    

if __name__ == "__main__":
    main()
