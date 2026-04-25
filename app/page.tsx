import PostCard from "@/components/PostCard";
import CreatePost from "@/components/CreatePost";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";
import { getPosts } from "./actions/post.action";
import { getDbUserId } from "./actions/user.action";
import UnAuthenticatedSidebar from "@/components/UnauthenticatedSidebar ";

export default async function Home() {
  const user = await currentUser();

if (!user?.id) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-4">
        {/* Desktop text only */}
        <h2 className="hidden lg:block text-2xl font-semibold">
          Please login first
        </h2>

        {/* Mobile + tablet card */}
        <div className="lg:hidden">
          <UnAuthenticatedSidebar />
        </div>
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
