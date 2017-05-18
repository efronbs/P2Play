import threading, logging, time
import array
import struct

from kafka import KafkaConsumer, KafkaProducer


class Consumer(threading.Thread):
    daemon = True

    def run(self):
        consumer = KafkaConsumer(bootstrap_servers='localhost:9092',
                                 auto_offset_reset='earliest')
        producer = KafkaProducer(bootstrap_servers='localhost:9092')
        consumer.subscribe(['numbers-to-add'])

        for message in consumer:
            value1 = struct.unpack('B', message.value[0:1])[0]
            value2 = struct.unpack('B', message.value[1:2])[0]

            print ("I recieved " + str(value1) + " and " + str(value2))

            addedValue = value1 + value2

            producer.send('added-numbers', array.array('B', [addedValue]).tostring())


def main():
    threads = [
        # Producer(),
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