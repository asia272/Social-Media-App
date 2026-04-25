import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";
import { getPosts } from "./actions/post.action";
import { getDbUserId } from "./actions/user.action";

export default async function Home() {
  const user = await currentUser();

if (!user?.id) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 text-center border w-[320px]">
        <h2 className="text-xl font-semibold mb-2">Login Required</h2>
        <p className="text-gray-500">Please login first to continue</p>
      </div>
    </div>
  );
}
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-6">
        {user ? <CreatePost /> : null}

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} dbUserId={dbUserId} />
          ))}
        </div>
      </div>

      <div className="hidden lg:block lg:col-span-4 sticky top-20">
        <WhoToFollow />
      </div>
    </div>
  );
}
