import Timeline from "@/components/landing/Timeline";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <main className="flex-grow flex flex-col items-center gap-20 2xl:gap-32 px-48 py-8 xl:px-32 xl:py-16 2xl:px-64">
      <section className="flex flex-col text-center gap-8">
        <h1 className="text-6xl font-bold">
          Start{" "}
          <strong className="text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-rose-600">
            splitting
          </strong>{" "}
          your <br />
          video in{" "}
          <strong className="text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-rose-600">
            seconds
          </strong>
          .
        </h1>

        <h1 className="text-6xl font-bold">Cut using AI & Automation.</h1>

        <h2 className="text-xl text-muted-foreground">
          Let us handle the intricate work - allow the magic of automatic
          <br />
          scene detection to set your creativity free!
        </h2>

        <div className="flex gap-8  w-full items-center justify-center">
          <Button asChild className="px-10 py-6 text-xl shadow">
            <Link href={"/auth/sign-up"}>Get started</Link>
          </Button>

          <Button asChild className="px-10 py-6 text-xl" variant="link">
            <Link href={"/pricing"}>See our pricing</Link>
          </Button>
        </div>
      </section>

      <section className="flex items-center justify-center">
        <h3 className="text-5xl font-bold text-center">
          Video editors, ever faced the{" "}
          <strong className="text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-rose-600">
            challenge
          </strong>{" "}
          of manually{" "}
          <strong className="text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-rose-600">
            cutting
          </strong>{" "}
          each shot in your endless footage?
        </h3>
      </section>

      <section className="flex flex-col gap-16">
        <div className="grid grid-cols-2 gap-16">
          <div className="flex flex-col gap-16">
            <h3 className="text-5xl font-bold">
              Try{" "}
              <strong className="text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-rose-600">
                Shotcutt
              </strong>{" "}
              Now!
            </h3>

            <h4 className="text-medium text-4xl">
              An innovation revolutionizing video editing! Our powerful
              algorithm automatically detects each shot change, effortlessly
              cutting your footage into relevant clips without any effort on
              your part.
            </h4>

            <div className="flex">
              <Button className="px-10 py-6 text-xl shadow" asChild>
                <Link href={"/auth/sign-up"}>Start for Free</Link>
              </Button>
            </div>
          </div>

          <AspectRatio ratio={16 / 9}>
            <video
              autoPlay={true}
              src="/video.webm"
              className="h-full w-full rounded-lg shadow-lg object-cover"
            />
          </AspectRatio>
        </div>

        <Timeline />
      </section>

      <section className="w-full bg-gradient-to-tl from-blue-500 to-rose-600 rounded-lg">
        <div className="flex gap-16 w-full h-full items-center justify-center py-24 rounded-full">
          <Button className="px-10 py-6 text-xl shadow" asChild>
            <Link href={"/auth/sign-up"}>Get started</Link>
          </Button>
          <Button
            className="px-10 py-6 text-xl shadow"
            variant="outline"
            asChild
          >
            <Link href={"/pricing"}>See our pricing</Link>
          </Button>
        </div>
      </section>

      {/* <section className="flex flex-col gap-16">
        <h5>
          <p className="text-5xl font-bold text-center ">
            Loved by{" "}
            <strong className="text-transparent bg-clip-text bg-gradient-to-tl from-blue-500 to-rose-600">
              4.2k
            </strong>{" "}
            users
          </p>
        </h5>

        <Separator />

        <div className="grid grid-cols-3 grid-rows-2 gap-8">
          <div className="flex flex-col bg-white p-2 rounded-lg gap-2 hover:scale-105 transition duration-500 ease-out shadow-lg">
            <div className="flex">
              <p className="font-semibold">Olivia K.</p>
              <p className="ml-auto">Time-Saver Extraordinaire</p>
            </div>

            <p className="font-semibold">
              "My videos used to take hours to edit, but with ShotCutt, it's a
              quick and enjoyable process. The premium plan's features are a
              game-changer for my workflow!"
            </p>
          </div>

          <div className="flex flex-col bg-white p-2 rounded-lg gap-2 hover:scale-105 transition duration-500 ease-out shadow-lg">
            <div className="flex">
              <p className="font-semibold">Olivia K.</p>
              <p className="ml-auto">Time-Saver Extraordinaire</p>
            </div>

            <p className="font-semibold">
              "My videos used to take hours to edit, but with ShotCutt, it's a
              quick and enjoyable process. The premium plan's features are a
              game-changer for my workflow!"
            </p>
          </div>

          <div className="flex flex-col bg-white p-2 rounded-lg gap-2 hover:scale-105 transition duration-500 ease-out shadow-lg">
            <div className="flex">
              <p className="font-semibold">Olivia K.</p>
              <p className="ml-auto">Time-Saver Extraordinaire</p>
            </div>

            <p className="font-semibold">
              "My videos used to take hours to edit, but with ShotCutt, it's a
              quick and enjoyable process. The premium plan's features are a
              game-changer for my workflow!"
            </p>
          </div>

          <div className="flex flex-col bg-white p-2 rounded-lg gap-2 hover:scale-105 transition duration-500 ease-out shadow-lg">
            <div className="flex">
              <p className="font-semibold">Olivia K.</p>
              <p className="ml-auto">Time-Saver Extraordinaire</p>
            </div>

            <p className="font-semibold">
              "My videos used to take hours to edit, but with ShotCutt, it's a
              quick and enjoyable process. The premium plan's features are a
              game-changer for my workflow!"
            </p>
          </div>

          <div className="flex flex-col bg-white p-2 rounded-lg gap-2 hover:scale-105 transition duration-500 ease-out shadow-lg">
            <div className="flex">
              <p className="font-semibold">Olivia K.</p>
              <p className="ml-auto">Time-Saver Extraordinaire</p>
            </div>

            <p className="font-semibold">
              "My videos used to take hours to edit, but with ShotCutt, it's a
              quick and enjoyable process. The premium plan's features are a
              game-changer for my workflow!"
            </p>
          </div>

          <div className="flex flex-col bg-white p-2 rounded-lg gap-2 hover:scale-105 transition duration-500 ease-out shadow-lg">
            <div className="flex">
              <p className="font-semibold">Olivia K.</p>
              <p className="ml-auto">Time-Saver Extraordinaire</p>
            </div>

            <p className="font-semibold">
              "My videos used to take hours to edit, but with ShotCutt, it's a
              quick and enjoyable process. The premium plan's features are a
              game-changer for my workflow!"
            </p>
          </div>
        </div>
      </section> */}
    </main>
  );
};

export default LandingPage;
