import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    defaultValue: { control: { type: 'text' } },
    orientation: { control: { type: 'radio' }, options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-gray-600">
            Make changes to your account here. Click save when you're done.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input 
              className="w-full p-2 border rounded-md" 
              placeholder="Enter your name"
              defaultValue="Pedro Duarte"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <input 
              className="w-full p-2 border rounded-md" 
              placeholder="Enter your username"
              defaultValue="@peduarte"
            />
          </div>
          <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Save changes
          </button>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-gray-600">
            Change your password here. After saving, you'll be logged out.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-medium">Current password</label>
            <input 
              type="password"
              className="w-full p-2 border rounded-md" 
              placeholder="Enter current password"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New password</label>
            <input 
              type="password"
              className="w-full p-2 border rounded-md" 
              placeholder="Enter new password"
            />
          </div>
          <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Save password
          </button>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Overview</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <div className="text-2xl font-bold">2.4k</div>
              <div className="text-sm text-gray-500">Total Users</div>
            </div>
            <div className="p-4 border rounded-md">
              <div className="text-2xl font-bold">1.2k</div>
              <div className="text-sm text-gray-500">Active Sessions</div>
            </div>
            <div className="p-4 border rounded-md">
              <div className="text-2xl font-bold">573</div>
              <div className="text-sm text-gray-500">New Signups</div>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="analytics">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Analytics</h3>
          <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">
            <p className="text-gray-500">Chart would go here</p>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Reports</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <span>Monthly Report - January 2024</span>
              <button className="text-blue-500 hover:text-blue-600">Download</button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-md">
              <span>Quarterly Report - Q4 2023</span>
              <button className="text-blue-500 hover:text-blue-600">Download</button>
            </div>
            <div className="flex justify-between items-center p-3 border rounded-md">
              <span>Annual Report - 2023</span>
              <button className="text-blue-500 hover:text-blue-600">Download</button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">Available</TabsTrigger>
        <TabsTrigger value="tab2" disabled>Disabled</TabsTrigger>
        <TabsTrigger value="tab3">Another Tab</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4">
          <h3 className="text-lg font-medium">Available Tab</h3>
          <p className="text-sm text-gray-600 mt-2">
            This tab is available and can be clicked.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4">
          <h3 className="text-lg font-medium">Disabled Tab</h3>
          <p className="text-sm text-gray-600 mt-2">
            This tab is disabled and cannot be accessed.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4">
          <h3 className="text-lg font-medium">Another Tab</h3>
          <p className="text-sm text-gray-600 mt-2">
            This is another available tab with some content.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

export const SimpleTabs: Story = {
  render: () => (
    <Tabs defaultValue="home" className="w-[300px]">
      <TabsList>
        <TabsTrigger value="home">Home</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <div className="p-4 text-center">
          <h3 className="font-medium">Welcome Home</h3>
          <p className="text-sm text-gray-500 mt-2">This is the home page content.</p>
        </div>
      </TabsContent>
      <TabsContent value="about">
        <div className="p-4 text-center">
          <h3 className="font-medium">About Us</h3>
          <p className="text-sm text-gray-500 mt-2">Learn more about our company.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};