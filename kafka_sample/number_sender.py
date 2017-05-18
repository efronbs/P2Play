import threading, logging, time
import array
import struct

from kafka import KafkaConsumer, KafkaProducer
from random import randint

# https://kafka.apache.org/quickstart
# do step 1 and 2 to start kafka server

class Producer(threading.Thread):
    daemon = True

    def run(self):
        producer = KafkaProducer(bootstrap_servers='localhost:9092')

        while True:
            x = randint(0, 9)
            y = randint(0, 9)
            print("I sent the numbers " + str(x) + " and " + str(y))
            producer.send('numbers-to-add', array.array('B', [x, y]).tostring())
            time.sleep(1)


class Consumer(threading.Thread):
    daemon = True

    def run(self):
        consumer = KafkaConsumer(bootstrap_servers='localhost:9092',
                                 auto_offset_reset='earliest')
        consumer.subscribe(['added-numbers'])

        for message in consumer:
            value1 = struct.unpack('B', message.value[0:1])[0]
            print ("I recieved " + str(value1))



def main():
    threads = [
        Producer(),
        Consumer()
    ]

    for t in threads:
        t.start()

    time.sleep(100)

if __name__ == "__main__":
    # logging.basicConfig(
    #     format='%(asctime)s.%(msecs)s:%(name)s:%(thread)d:%(levelname)s:%(process)d:%(message)s',
    #     level=logging.INFO
    #     )
    main()