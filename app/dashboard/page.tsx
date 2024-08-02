import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="flex flex-1 flex-col p-8 gap-6">
      <TypographyH1>Welcome back, Ryan 👋</TypographyH1>
      <div className="flex flex-wrap gap-4">
        <Card className="flex-1 min-w-[200px] bg-asparagus dark:hover:bg-zinc-900 hover:shadow-xl">
          <CardHeader>
            <CardTitle>Last read</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button>Log reading</Button>
          </CardFooter>
        </Card>
        <Card className="flex-1 min-w-[200px]">
          <CardHeader>
            <CardTitle>Last read</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button>Log reading</Button>
          </CardFooter>
        </Card>
        <Card className="flex-1 min-w-[200px]">
          <CardHeader>
            <CardTitle>Last read</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button>Log reading</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
