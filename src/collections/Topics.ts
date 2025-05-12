import type { CollectionConfig } from 'payload'

export const Topics: CollectionConfig = {
  slug: 'topics',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Technology', value: 'Technology' },
        { label: 'Science', value: 'Science' },
        { label: 'Health', value: 'Health' },
        { label: 'Business', value: 'Business' },
        { label: 'Entertainment', value: 'Entertainment' },
        { label: 'Sports', value: 'Sports' },
        { label: 'Politics', value: 'Politics' },
        { label: 'Education', value: 'Education' },
        { label: 'Art', value: 'Art' },
        { label: 'Other', value: 'Other' },
      ],
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      access: {
        create: () => false,
        read: () => true,
        update: () => false,
      },
      hooks: {
        beforeChange: [
          async ({ operation, value, req: { user } }) => {
            if (operation === 'create' && user) {
              return user.id
            }
            return value
          },
        ],
      },
    },
  ],
}
