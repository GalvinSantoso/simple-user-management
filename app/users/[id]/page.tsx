import Breadcrumb from "@/components/shared/breadcrumb";
import NavigationTitle from "@/components/shared/navigation-title";
import UserInformation from "@/features/user-detail/ui/user-information";
import UserTodos from "@/features/user-detail/ui/user-todos";
import UserPosts from "@/features/user-detail/ui/user-posts";
import { Metadata } from "next";
import { getUserDetail } from "@/features/user-detail/actions/actions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const user = await getUserDetail(id);

    return {
      title: `${user.name} — User Detail`,
      description: `Profile and activity for ${user.name} (@${user.username})`,
    };
  } catch {
    return { title: "User Detail" };
  }
}

const UserDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="container mx-auto grid grid-cols-1 py-8 gap-y-4 px-4 md:px-0">
      <header className="space-y-3">
        <Breadcrumb
          items={[
            { name: "Users", link: "/users" },
            { name: "User Detail", link: `/users/${id}` },
          ]}
        />
        <NavigationTitle
          title="User Detail"
          desc="Viewing user profile details, todos checklist, and post submissions"
          backUrl="/users"
        />
      </header>

      <section>
        <UserInformation userId={id} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 items-start">
        <UserTodos userId={id} />
        <UserPosts userId={id} />
      </section>
    </div>
  );
};

export default UserDetailPage;
