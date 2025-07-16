<template>
  <Dashboard>
    <div class="bg-white p-2">

      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold flex items-center gap-1">
          <ScrollTextIcon /> Blog
        </h1>
        <Button @click="modal = true">
          <PlusIcon />
          Add Blog
        </Button>
      </div>
      <div class="w-full mt-5">
        <div class="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Title
                </TableHead>
                <TableHead>
                  Description
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  amin
                </TableCell>
                <TableCell>
                  amin
                </TableCell>
                <TableCell class="w-20">
                  <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                      <Button variant="ghost" class="w-8 h-8 p-0">
                        <span class="sr-only">Open menu</span>
                        <MoreHorizontalIcon class="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div class="flex items-center justify-end space-x-2 py-4">
          <div class="space-x-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>

  </Dashboard>
  <Dialog v-model:open="modal">
    <DialogScrollContent class="w-full md:max-w-[650px] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Blog</DialogTitle>
        <DialogDescription>
          Add a new blog to the list.
        </DialogDescription>
      </DialogHeader>
      <div class="space-y-2">
        <div class="space-y-1">
          <Label for="title">Title</Label>
          <Input id="title" v-model="form.title" />
        </div>
        <div class="space-y-1">
          <Label for="title">Slug</Label>
          <Input id="title" v-model="form.slug" />
        </div>

        <div class="space-y-1">
          <Label for="title">Slug</Label>
          <pre>{{ form.content }}</pre>
          <QuillEditor v-model:content="form.content" toolbar="full" theme="snow" content="string" />
        </div>
      </div>
      <DialogFooter>
        <Button>{{ editModal ? 'Update' : 'Add' }} Blog</Button>
      </DialogFooter>
    </DialogScrollContent>
  </Dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ScrollTextIcon, PlusIcon, MoreHorizontalIcon } from 'lucide-vue-next';

export default {
  name: "DashboardBlog",

  components: {
    ScrollTextIcon, PlusIcon, MoreHorizontalIcon,
    QuillEditor: defineAsyncComponent(() =>
      import('@vueup/vue-quill').then(m => m.QuillEditor)
    )
  },
  data() {
    return {
      modal: false,
      editModal: false,
      form: {
        title: '',
        slug: '',
        content: '',
        seo: {
          title: '',
          description: '',
          ogTitle: '',
          ogDescription: '',
          twitterTitle: '',
          twitterDescription: '',
        }
      },
    };
  },


};
</script>
