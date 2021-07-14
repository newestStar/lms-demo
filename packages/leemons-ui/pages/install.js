import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/outline';
import Wrapper from '../src/components/Wrapper';

export default function InstallPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Head>
        <title>Leemons UI</title>
      </Head>

      <main data-theme="light">
        <h2 className="my-6 text-5xl font-bold">
          <span className="text-primary">Install as Tailwind CSS plugin</span>
        </h2>

        <Wrapper nocode>
          <p className="prose text-base-content opacity-60">
            You need{' '}
            <a target="_blank" href="https://nodejs.org/en/download/" rel="noreferrer">
              Node.js
            </a>{' '}
            and{' '}
            <a target="_blank" href="https://tailwindcss.com/docs/installation" rel="noreferrer">
              Tailwind CSS
            </a>{' '}
            installed.
          </p>

          <p className="my-4">1. Install LeemonsUI:</p>
          <div className="w-full max-w-xl my-2">
            <div className="shadow-lg mockup-code">
              <pre data-prefix="$">
                <code>npm i leemons-ui --save</code>
              </pre>
            </div>
          </div>

          <p className="my-4">
            2. Then add LeemonsUI to your{' '}
            <span className="badge badge-outline">tailwind.config.js</span>
          </p>
          <div className="w-full max-w-xl my-2">
            <div className="text-sm shadow-lg mockup-code">
              <pre>
                <code>
                  {`module.exports = {

      plugins: [`}
                  <span className="badge badge-primary">{`require('leemons-ui/dist/theme'),`}</span>
                  {`],

    }`}
                </code>
              </pre>
            </div>
          </div>
        </Wrapper>

        <div className="flex justify-end max-w-4xl pt-10 mt-20 border-t-2 border-base-200">
          <Link href="/use">
            <a className="text-xs btn-lg btn lg:text-lg">
              Next: How to use
              <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
