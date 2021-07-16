import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
  ChevronRightIcon,
  EyeIcon,
  DotsVerticalIcon,
  MenuIcon,
  BellIcon,
  SearchIcon,
  CodeIcon,
  FolderIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline';
import Wrapper from '../src/components/Wrapper';
import ClassTable from '../src/components/ClassTable';
import {
  Badge,
  Button,
  Navbar,
  Card,
  Avatar,
  Checkbox,
  Progress,
  Toggle,
  Menu,
  MenuItem,
  Alert,
} from '../src/components/ui';
import hexToHSL from '../src/theme/colors/hex2hsl';

const COLOR_VALUES = {
  p: { hsl: '259 94% 51%', hex: '#570df8', name: 'primary' },
  pf: { hsl: '259 94% 41%', hex: '#4506cb', name: 'primary-focus' },
  pc: { hsl: '0 0% 100%', hex: '#ffffff', name: 'primary-content' },

  s: { hsl: '314 100% 47%', hex: '#f000b8', name: 'secondary' },
  sf: { hsl: '314 100% 37%', hex: '#bd0091', name: 'secondary-focus' },
  sc: { hsl: '0 0% 100%', hex: '#ffffff', name: 'secondary-content' },

  a: { hsl: '174 60% 51%', hex: '#37cdbe', name: 'accent' },
  af: { hsl: '174 60% 41%', hex: '#2aa79b', name: 'accent-focus' },
  ac: { hsl: '0 0% 100%', hex: '#ffffff', name: 'accent-content' },

  n: { hsl: '219 14% 28%', hex: '#3d4451', name: 'neutral' },
  nf: { hsl: '222 13% 19%', hex: '#2a2e37', name: 'neutral-focus' },
  nc: { hsl: '0 0% 100%', hex: '#ffffff', name: 'neutral-content' },

  b1: { hsl: '0 0% 100%', hex: '#ffffff', name: 'base-100' },
  b2: { hsl: '210 20% 98%', hex: '#f9fafb', name: 'base-200' },
  b3: { hsl: '216 12% 84%', hex: '#d1d5db', name: 'base-300' },
  bc: { hsl: '215 28% 17%', hex: '#1f2937', name: 'base-content' },

  in: { hsl: '207 90% 54%', hex: '#2094f3', name: 'info' },
  inf: { hsl: '207 90% 54%', hex: '#2094f3', name: 'info-focus' },
  inc: { hsl: '207 90% 54%', hex: '#2094f3', name: 'info-content' },
  su: { hsl: '174 100% 29%', hex: '#009485', name: 'success' },
  suf: { hsl: '174 100% 29%', hex: '#009485', name: 'success-focus' },
  suc: { hsl: '174 100% 29%', hex: '#009485', name: 'success-content' },
  wa: { hsl: '36 100% 50%', hex: '#ff9900', name: 'warning' },
  waf: { hsl: '36 100% 50%', hex: '#ff9900', name: 'warning-focus' },
  wac: { hsl: '36 100% 50%', hex: '#ff9900', name: 'warning-content' },
  er: { hsl: '14 100% 57%', hex: '#ff5724', name: 'error' },
  erf: { hsl: '14 100% 57%', hex: '#ff5724', name: 'error-focus' },
  erc: { hsl: '14 100% 57%', hex: '#ff5724', name: 'error-content' },
};
const COLORS = {
  primary: [
    { title: 'primary', name: 'p', class: 'bg-primary' },
    { title: 'primary-focus', name: 'pf', class: 'bg-primary-focus' },
    { title: 'primary-content', name: 'pc', class: 'bg-primary-content' },
  ],
  secondary: [
    { title: 'secondary', name: 's', class: 'bg-secondary' },
    { title: 'secondary-focus', name: 'sf', class: 'bg-secondary-focus' },
    { title: 'secondary-content', name: 'sc', class: 'bg-secondary-content' },
  ],
  accent: [
    { title: 'accent', name: 'a', class: 'bg-accent' },
    { title: 'accent-focus', name: 'af', class: 'bg-accent-focus' },
    { title: 'accent-content', name: 'ac', class: 'bg-accent-content' },
  ],
  neutral: [
    { title: 'neutral', name: 'n', class: 'bg-neutral' },
    { title: 'neutral-focus', name: 'nf', class: 'bg-neutral-focus' },
    { title: 'neutral-content', name: 'nc', class: 'bg-neutral-content' },
  ],
  base: [
    { title: 'base-100', name: 'b1', class: 'bg-base-100' },
    { title: 'base-200', name: 'b2', class: 'bg-base-200' },
    { title: 'base-300', name: 'b3', class: 'bg-base-300' },
    { title: 'base-content', name: 'bc', class: 'bg-base-content' },
  ],
  state: [
    { title: 'info', name: 'in', class: 'bg-info' },
    { title: 'info-focus', name: 'inf', class: 'bg-info-focus' },
    { title: 'info-content', name: 'inc', class: 'bg-info-content' },
    { title: 'success', name: 'su', class: 'bg-success' },
    { title: 'success-focus', name: 'suf', class: 'bg-success-focus' },
    { title: 'success-content', name: 'suc', class: 'bg-success-content' },
    { title: 'warning', name: 'wa', class: 'bg-warning' },
    { title: 'warning-focus', name: 'waf', class: 'bg-warning-focus' },
    { title: 'warning-content', name: 'wac', class: 'bg-warning-content' },
    { title: 'error', name: 'er', class: 'bg-error' },
    { title: 'error-focus', name: 'erf', class: 'bg-error-focus' },
    { title: 'error-content', name: 'erc', class: 'bg-error-content' },
  ],
};

const CLASS_DATA = {
  showTitle: false,
  showType: false,
  showColors: true,
  utilities: [
    { class: 'bg-primary', color: 'bg-primary', desc: 'Primary color' },
    { class: 'bg-primary-focus', color: 'bg-primary-focus', desc: 'Primary color - focused' },
    {
      class: 'bg-primary-content',
      color: 'bg-primary-content',
      desc: 'Foreground content color to use on primary color',
    },
    { class: 'bg-secondary', color: 'bg-secondary', desc: 'Secondary color' },
    { class: 'bg-secondary-focus', color: 'bg-secondary-focus', desc: 'Secondary color - focused' },
    {
      class: 'bg-secondary-content',
      color: 'bg-secondary-content',
      desc: 'Foreground content color to use on secondary color',
    },
    { class: 'bg-accent', color: 'bg-accent', desc: 'Accent color' },
    { class: 'bg-accent-focus', color: 'bg-accent-focus', desc: 'Accent color - focused' },
    {
      class: 'bg-accent-content',
      color: 'bg-accent-content',
      desc: 'Foreground content color to use on accent color',
    },
    { class: 'bg-neutral', color: 'bg-neutral', desc: 'Neutral color' },
    { class: 'bg-neutral-focus', color: 'bg-neutral-focus', desc: 'Neutral color - focused' },
    {
      class: 'bg-neutral-content',
      color: 'bg-neutral-content',
      desc: 'Foreground content color to use on neutral color',
    },
    {
      class: 'bg-base-100',
      color: 'bg-base-100',
      desc: 'Base color of page, used for blank backgrounds',
    },
    { class: 'bg-base-200', color: 'bg-base-200', desc: 'Base color, a little darker' },
    { class: 'bg-base-300', color: 'bg-base-300', desc: 'Base color, even more darker' },
    {
      class: 'bg-base-content',
      color: 'bg-base-content',
      desc: 'Foreground content color to use on base color',
    },
    { class: 'bg-info', color: 'bg-info', desc: 'Info color' },
    { class: 'bg-info-focus', color: 'bg-info-focus', desc: 'Info color - focused' },
    {
      class: 'bg-info-content',
      color: 'bg-info-content',
      desc: 'Foreground content color to use on Info color',
    },
    { class: 'bg-success', color: 'bg-success', desc: 'Success color' },
    { class: 'bg-success-focus', color: 'bg-success-focus', desc: 'Success color - focused' },
    {
      class: 'bg-success-content',
      color: 'bg-success-content',
      desc: 'Foreground content color to use on Success color',
    },
    { class: 'bg-warning', color: 'bg-warning', desc: 'Warning color' },
    { class: 'bg-warning-focus', color: 'bg-warning-focus', desc: 'Warning color - focused' },
    {
      class: 'bg-warning-content',
      color: 'bg-warning-content',
      desc: 'Foreground content color to use on Warning color',
    },
    { class: 'bg-error', color: 'bg-error', desc: 'Error color' },
    { class: 'bg-error-focus', color: 'bg-error-focus', desc: 'Error color - focused' },
    {
      class: 'bg-error-content',
      color: 'bg-error-content',
      desc: 'Foreground content color to use on Error color',
    },
  ],
};

export default function UsePage() {
  const [activeTab, setActiveTab] = useState('colors');
  const [applyCustomThemeToSite, setApplyCustomThemeToSite] = useState(true);
  const [colorValues, setColorValues] = useState(COLOR_VALUES);
  const [showCustomThemeTogglerSwitch, setShowCustomThemeTogglerSwitch] = useState(true);

  const hexToHsl = (colorName, e) => {
    const hex = e.target.value;
    const [h, s, l] = hexToHSL(hex).replaceAll('%', '').split(' ');
    const newValues = { ...colorValues };
    newValues[colorName].hsl = `${Math.floor(h)} ${Math.floor(s)}% ${Math.floor(l)}%`;
    setColorValues(newValues);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Head>
        <title>Leemons UI</title>
      </Head>

      <main data-theme="light">
        <h2 className="my-6 text-5xl font-bold">
          <span className="text-primary">Colors</span>
        </h2>

        <div className="text-base-content">
          <Wrapper nocode>
            <div className="text-xl font-bold text-base-content">Read the documents</div>
            <p>Read everything about DaisyUI colors and theming:</p>
            <p className="mt-4">
              <Link href="/docs/default-themes">
                <a className="link">How to use themes?</a>
              </Link>
              <br />
              <Link href="/docs/add-themes">
                <a className="link">How to add new theme?</a>
              </Link>
            </p>
          </Wrapper>
        </div>

        <div className="tabs mb-6 mt-10">
          <button
            onClick={() => setActiveTab('colors')}
            className={`tab tab-lifted tab-lg ${activeTab === 'colors' ? 'tab-active' : ''}`}
          >
            Customize
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`tab tab-lifted tab-lg ${activeTab === 'preview' ? 'tab-active' : ''}`}
          >
            Preview
          </button>
          <button
            onClick={() => setActiveTab('output')}
            className={`tab tab-lifted tab-lg ${activeTab === 'output' ? 'tab-active' : ''}`}
          >
            Result
          </button>
          <span className="tab tab-lifted tab-lg flex-grow cursor-default hidden sm:block"></span>
        </div>

        <div id="colors" className={activeTab !== 'colors' ? 'hidden' : ''}>
          <div className="text-xl font-bold text-base-content">Edit colors</div>
          <div className="mb-6">Choose your own colors</div>
          {showCustomThemeTogglerSwitch && (
            <div className="w-56 card">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">Show customized colors</span>
                  <div>
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={applyCustomThemeToSite}
                      onChange={() => setApplyCustomThemeToSite(!applyCustomThemeToSite)}
                    />
                    <span className="toggle-mark"></span>
                  </div>
                </label>
              </div>
            </div>
          )}

          <Wrapper className="grid grid-cols-1 md:grid-cols-6 gap-6" nocode>
            {Object.keys(COLORS).map((colorGroup) => (
              <div className="block mb-4" key={colorGroup}>
                <div className="mb-4 text-xs uppercase opacity-50">{colorGroup}</div>
                <div className="grid rounded">
                  <div className="flex flex-col col-start-1 row-start-1">
                    {COLORS[colorGroup].map((color, j) => (
                      <div key={`c-${j}`} className="relative col-start-1 row-start-1">
                        <label
                          htmlFor={color.name}
                          className={`flex justify-start items-end w-full h-20 transform transition-all cursor-pointer shadow hover:shadow-lg hover:-translate-y-1 ${
                            color.class
                          } ${j === 0 ? ' rounded-t ' : ''} ${
                            j === colorGroup.length - 1 ? ' rounded-b ' : ''
                          }`}
                        >
                          <div className="px-1 m-1 text-xs text-white bg-black rounded bg-opacity-20">
                            .bg-{color.title}
                          </div>
                        </label>
                        <input
                          type="color"
                          id={color.name}
                          className="absolute top-0 invisible opacity-0"
                          value={colorValues[color.name].hex}
                          onChange={(e) => {
                            hexToHsl(color.name, e);
                            setApplyCustomThemeToSite(true);
                            setShowCustomThemeTogglerSwitch(true);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </Wrapper>
        </div>

        <div id="preview" className={activeTab !== 'preview' ? 'hidden' : ''}>
          <div className="text-xl font-bold text-base-content">Preview components</div>
          <div className="mb-6">See how components will look like using you color palette</div>
          <div>
            <div className="grid grid-cols-1 gap-6 lg:p-10 xl:grid-cols-3 lg:bg-base-200 rounded-box">
              <Navbar className="col-span-1 shadow-lg xl:col-span-3 bg-primary-focus text-primary-content rounded-box">
                <div className="flex-none">
                  <Button square className="btn-ghost">
                    <MenuIcon className="inline-block w-6 h-6 stroke-current" />
                  </Button>
                </div>
                <div className="flex-none px-2 mx-2">
                  <span className="text-lg font-bold">LeemonsUI</span>
                </div>
                <div className="flex justify-center flex-1 px-2 mx-2">
                  <div className="items-stretch hidden lg:flex">
                    <a className="btn btn-ghost btn-sm rounded-btn">Home</a>
                    <a className="btn btn-ghost btn-sm rounded-btn">Portfolio</a>
                    <a className="btn btn-ghost btn-sm rounded-btn">About</a>
                    <a className="btn btn-ghost btn-sm rounded-btn">Contact</a>
                  </div>
                </div>
                <div className="flex-none">
                  <Button square className="btn-ghost">
                    <BellIcon className="inline-block w-6 h-6 stroke-current" />
                  </Button>
                </div>
                <div className="flex-none">
                  <Button square className="btn-ghost">
                    <SearchIcon className="inline-block w-6 h-6 stroke-current" />
                  </Button>
                </div>
              </Navbar>

              <Card className="shadow-lg compact side bg-base-100">
                <div className="flex-row items-center space-x-4 card-body">
                  <div>
                    <Avatar className="rounded-full w-14 h-14 shadow">
                      <img src="https://i.pravatar.cc/500?img=32" />
                    </Avatar>
                  </div>
                  <div>
                    <h2 className="card-title">Janis Johnson</h2>
                    <p className="text-base-content text-opacity-40">Accounts Agent</p>
                  </div>
                </div>
              </Card>

              <Card className="shadow-lg compact side bg-base-100">
                <div className="flex-row items-center space-x-4 card-body">
                  <div className="flex-1">
                    <h2 className="card-title">Meredith Mayer</h2>
                    <p className="text-base-content text-opacity-40">Data Liaison</p>
                  </div>
                  <div className="flex-0">
                    <Button className="btn-sm">Follow</Button>
                  </div>
                </div>
              </Card>

              <Card className="row-span-3 shadow-lg compact bg-base-100">
                <figure>
                  <img src="https://picsum.photos/id/1005/600/400" />
                </figure>
                <div className="flex-row items-center space-x-4 card-body">
                  <div>
                    <h2 className="card-title">Karolann Collins</h2>
                    <p className="text-base-content text-opacity-40">Direct Interactions Liaison</p>
                  </div>
                </div>
              </Card>

              <Card className="shadow-lg compact side bg-base-100">
                <div className="flex-row items-center space-x-4 card-body">
                  <div className="flex-1">
                    <h2 className="card-title text-primary">4,600</h2>
                    <p className="text-base-content text-opacity-40">Page views</p>
                  </div>
                  <div className="flex space-x-2 flex-0">
                    <Button className="btn-sm btn-square">
                      <EyeIcon className="inline-block w-6 h-6 stroke-current" />
                    </Button>
                    <Button className="btn-sm btn-square">
                      <DotsVerticalIcon className="inline-block w-6 h-6 stroke-current" />
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="shadow-lg compact side bg-base-100">
                <div className="flex-row items-center space-x-4 card-body">
                  <label className="flex-0">
                    <Toggle className="toggle-primary" />
                  </label>
                  <div className="flex-1">
                    <h2 className="card-title">Enable Notifications</h2>
                    <p className="text-base-content text-opacity-40">To get latest updates</p>
                  </div>
                </div>
              </Card>

              <Card className="col-span-1 row-span-3 shadow-lg xl:col-span-2 bg-base-100">
                <div className="card-body">
                  <h2 className="my-4 text-4xl font-bold card-title">Top 10 UI Components</h2>
                  <div className="mb-4 space-x-2 card-actions">
                    <Badge className="badge-ghost">Colors</Badge>
                    <Badge className="badge-ghost">UI Design</Badge>
                    <Badge className="badge-ghost">Creativity</Badge>
                  </div>
                  <p>
                    Rerum reiciendis beatae tenetur excepturi aut pariatur est eos. Sit sit
                    necessitatibus veritatis sed molestiae voluptates incidunt iure sapiente.
                  </p>
                  <div className="justify-end space-x-2 card-actions">
                    <Button className="btn-primary">Login</Button>
                    <Button>Register</Button>
                  </div>
                </div>
              </Card>

              <Card className="shadow-lg compact side bg-base-100">
                <div className="flex-row items-center space-x-4 card-body">
                  <div className="flex-1">
                    <h2 className="flex card-title">
                      <button className="btn btn-ghost btn-sm btn-circle loading"></button>
                      Downloading...
                    </h2>
                    <Progress className="progress-secondary" value="70" max="100"></Progress>
                  </div>
                  <div className="flex-0">
                    <button className="btn btn-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-6 h-6 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </Card>

              <Card className="shadow-lg compact side bg-base-100">
                <div className="flex-row items-center space-x-4 card-body">
                  <label className="cursor-pointer label">
                    <Checkbox className="checkbox-accent" />
                    <span className="mx-4 label-text">Enable Autosave</span>
                  </label>
                </div>
              </Card>

              <Menu className="row-span-3 p-4 shadow-lg bg-base-100 rounded-box">
                <MenuItem className="menu-title">
                  <span>Menu Title</span>
                </MenuItem>
                <MenuItem>
                  <a>
                    <EyeIcon className="inline-block w-5 h-5 mr-2 stroke-current" />
                    Item with icon
                  </a>
                </MenuItem>
                <MenuItem>
                  <a>
                    <CodeIcon className="inline-block w-5 h-5 mr-2 stroke-current" />
                    Item with icon
                  </a>
                </MenuItem>
                <MenuItem>
                  <a>
                    <FolderIcon className="inline-block w-5 h-5 mr-2 stroke-current" />
                    Item with icon
                  </a>
                </MenuItem>
              </Menu>

              <Alert className="col-span-1 xl:col-span-2 bg-base-100">
                <div className="flex-1">
                  <label className="mx-3">Lorem ipsum dolor sit amet, consectetur adip!</label>
                </div>
                <div className="flex-none">
                  <Button className="btn-sm btn-ghost mr-2">Cancel</Button>
                  <Button className="btn-sm btn-primary">Apply</Button>
                </div>
              </Alert>

              <Alert className="col-span-1 xl:col-span-2 alert-info">
                <div className="flex-1">
                  <InformationCircleIcon className="w-6 h-6 mx-2 stroke-current" />
                  <label>Lorem ipsum dolor sit amet, consectetur adip!</label>
                </div>
              </Alert>

              <Alert className="col-span-1 xl:col-span-2 alert-success">
                <div className="flex-1">
                  <FolderIcon className="w-6 h-6 mx-2 stroke-current" />
                  <label>Lorem ipsum dolor sit amet, consectetur adip!</label>
                </div>
              </Alert>
            </div>
          </div>
        </div>

        <div id="output" className={activeTab !== 'output' ? 'hidden' : ''}>
          <div className="text-xl font-bold text-base-content">Theme config</div>
          <div className="mb-6">This is your custom color theme. Add it to tailwind.config.js</div>
          <div className="w-full max-w-2xl my-2">
            <div className="shadow-lg mockup-code text-sm">
              <pre>
                <code>
                  {`leemons: {
            themes: [
              {
                'mytheme': {
                  ${Object.keys(colorValues).map(
                    (color) => `'${colorValues[color].name}': '${colorValues[color].hex}'`
                  )},
                },
              },
            ],
          },`}
                </code>
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div>
            You can use color names in utility classes just like Tailwind&apos;s color
            names.border-opacity-20
          </div>
          <div>These are default utility classes that use color names:</div>

          <div className="shadow-lg mockup-code text-sm mt-6">
            <pre>
              <code>
                {`  bg-`}
                <span className="text-info">{`{COLOR_NAME}`}</span>
                {`
    text-`}
                <span className="text-info">{`{COLOR_NAME}`}</span>
                {`
    border-`}
                <span className="text-info">{`{COLOR_NAME}`}</span>
                {`
    from-`}
                <span className="text-info">{`{COLOR_NAME}`}</span>
                {`
    via-`}
                <span className="text-info">{`{COLOR_NAME}`}</span>
                {`
    to-`}
                <span className="text-info">{`{COLOR_NAME}`}</span>
                {`
    placeholder-`}
                <span className="text-info">{`{COLOR_NAME}`}</span>
                {`
    divide-`}
                <span className="text-info">{`{COLOR_NAME}`}</span>
                {`
    ring-`}
                <span className="text-info">{`{COLOR_NAME}`}</span>
                {`
    ring-offset-`}
                <span className="text-info">{`{COLOR_NAME}`}</span>
              </code>
            </pre>
          </div>
        </div>

        <div className="my-6">For example these are all the background colors:</div>

        <ClassTable data={CLASS_DATA} />

        <div className="flex justify-end max-w-4xl pt-10 mt-20 border-t-2 border-base-200">
          <Link href="/layout">
            <a className="text-xs btn-lg btn lg:text-lg">
              Next: layout
              <ChevronRightIcon className="inline-block w-6 h-6 ml-2 stroke-current" />
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
