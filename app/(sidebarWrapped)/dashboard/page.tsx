import { TypographyH1, TypographyH2,} from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const cardStyling = "flex-1 min-w-[200px] dark:hover:bg-zinc-900 hover:shadow-md"

const DashboardPage = () => {
  return (
    <div className="flex flex-1 flex-col p-8 gap-6">
      <TypographyH1>Dashboard</TypographyH1>
      <TypographyH2>Welcome back, Ryan 👋</TypographyH2>
      <div className="flex flex-wrap gap-4">
        <Card className={cardStyling}>
          <CardHeader>
            <CardTitle>Last read</CardTitle>
          </CardHeader>
          <CardContent>
            HEllo
          </CardContent>
          <CardFooter>
            <Button>Log reading</Button>
          </CardFooter>
        </Card>
        <Card className={cardStyling}>
          <CardHeader>
            <CardTitle>Last read</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button>Log reading</Button>
          </CardFooter>
        </Card>
        <Card className={cardStyling}>
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
