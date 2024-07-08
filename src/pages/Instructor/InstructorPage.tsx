import Overview from "../../components/Admin/Overview";
import InstructorChart from "../../components/Charts/InstructorChart";
import MainLayout from "../../components/Layout/MainLayout";

const InstructorPage: React.FC = () => {
  return (
    <MainLayout>
      <section>
        <h1 className="text-xl font-bold">Instructor Dashboard</h1>
        <Overview />
        <div className="mt-10 grid grid-cols-2 gap-2">
          <div className="text-center">
            <InstructorChart />
            <p>Example 1</p>
          </div>
          <div className="text-center">
            <InstructorChart />
            <p>Example 2</p>
          </div>
        </div>
        {/* <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
                  <Card
                    title="Latest Courses performance"
                    extra={
                      <div>
                        <Button type="text" icon={<LeftOutlined />} />
                        <Button type="text" icon={<RightOutlined />} />
                      </div>
                    }
                    className="custom-card"
                  >
                    <div className="flex-grow items-center">
                      <img
                        src={PythonImg}
                        alt="Python Course"
                        className="mr-4 h-32 w-64 object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          Complete Python Bootcamp: Go from zero to hero in Python 3
                        </h3>
                        <p className="text-gray-500">First 2 days 22 hours</p>
                        <div className="my-2 justify-between">
                          <p>View: 1.5k</p>
                          <p>Purchased: 150</p>
                          <p>Total Like: 1k</p>
                        </div>
                        <div className="flex flex-col mt-2 space-y-2">
                          <Button type="link" className="p-0">GO TO COURSE ANALYTICS</Button>
                          <Button type="link" className="p-0">SEE COMMENTS (875)</Button>
                          <Button type="link" className="p-0">SEE REVIEWS (105)</Button>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card title="News" className="custom-card">
                    <div className="flex items-center">
                      <img
                        src="/path/to/news-image.png"
                        alt="News"
                        className="mr-4 h-24 w-24 object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          COVID-19 Updates & Resources
                        </h3>
                        <p>See the latest updates to coronavirus-related content, including changes to monetization, and access new Creator support resources.</p>
                        <Button type="link">LEARN MORE</Button>
                      </div>
                    </div>
                  </Card>

                  <Card title="Profile Analytics" className="custom-card">
                    <div>
                      <h2 className="text-3xl font-semibold">856</h2>
                      <p className="text-gray-500">Current subscribers</p>
                      <div className="mt-4">
                        <div className="flex justify-between">
                          <p>View</p>
                          <p>17k <span className="text-red-500">↓ 75%</span></p>
                        </div>
                        <div className="flex justify-between">
                          <p>Purchased (per hour)</p>
                          <p>1 <span className="text-red-500">↓ 100%</span></p>
                        </div>
                        <div className="flex justify-between">
                          <p>Enroll (per hour)</p>
                          <p>50 <span className="text-red-500">↓ 70%</span></p>
                        </div>
                        <Button type="link" className="mt-4">GO TO PROFILE ANALYTICS</Button>
                      </div>
                    </div>
                  </Card>

                  <Card title="Submit Courses" className="custom-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          The Complete JavaScript Course 2020: Build Real Projects!
                        </h3>
                        <p>Submitted 1 days ago</p>
                      </div>
                      <Button type="primary" danger>
                        Pending
                      </Button>
                    </div>
                    <Button type="link" className="mt-4">Delete</Button>
                  </Card>
                </div> */}
      </section>
    </MainLayout>
  );
};

export default InstructorPage;
