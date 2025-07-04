import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '@/components/ui/card';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: { control: { type: 'text' } },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here.</p>
      </CardContent>
      <CardFooter>
        <p>Card footer</p>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings and set e-mail preferences.</CardDescription>
        <CardAction>
          <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Edit
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input 
              className="w-full p-2 border rounded-md" 
              placeholder="Enter your name"
              defaultValue="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input 
              className="w-full p-2 border rounded-md" 
              placeholder="Enter your email"
              defaultValue="john@example.com"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <button className="px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Save changes
        </button>
      </CardFooter>
    </Card>
  ),
};

export const Notification: Story = {
  render: () => (
    <Card className="w-[380px]">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Your call has been confirmed.
            </p>
            <p className="text-sm text-gray-500">
              1 hour ago
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              You have a new message!
            </p>
            <p className="text-sm text-gray-500">
              1 hour ago
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Your subscription is expiring soon!
            </p>
            <p className="text-sm text-gray-500">
              2 hours ago
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Welcome</h3>
          <p className="text-sm text-gray-500 mt-2">
            This is a simple card without header or footer.
          </p>
        </div>
      </CardContent>
    </Card>
  ),
};