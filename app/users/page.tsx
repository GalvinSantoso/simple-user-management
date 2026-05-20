import Breadcrumb from "@/components/shared/breadcrumb";
import NavigationTitle from "@/components/shared/navigation-title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserTable from "@/features/users/ui/user-table";

const UsersPage = () => {
  return (
    <div className="container mx-auto grid grid-cols-1 py-8 gap-y-4 px-4 md:px-0">
      <header className="space-y-3">
        <Breadcrumb
          items={[
            { name: "Home", link: "/" },
            { name: "Users", link: "/users" },
          ]}
        />
        <NavigationTitle
          title="User List"
          desc=" A comprehensive data table displaying all registered application users"
        />
      </header>
      <section>
        <Card>
          <CardContent>
            <UserTable />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default UsersPage;
