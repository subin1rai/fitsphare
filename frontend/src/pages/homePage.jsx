import { useNavigate } from "react-router-dom";
import { Activity, Calculator, Dumbbell, TrendingUp, ArrowRight } from "lucide-react";
import hero from "../assets/hero.jpg";

const HomePage = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: Dumbbell,
      title: "Personalized Workouts",
      description: "Get customized workout plans for every muscle group",
    },
    {
      icon: Calculator,
      title: "Health Calculators",
      description: "Calculate your BMI and daily calorie needs",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your fitness journey with detailed analytics",
    },
    {
      icon: Activity,
      title: "Nutrition Guidance",
      description: "Receive expert nutrition advice for your goals",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <h1 className=" absolute z-12 top-0 md:text-4xl text-[#daff0d] text-xl p-4 md:pl-14">FIT<span className="text-white md:text-4xl text-xl">SPHERE</span></h1>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-black"
        >
            <img src={hero} alt="MAIN IMG" className=" absolute right-0 " />
            
          {/* <div className="absolute inset-0 bg-black/60" /> */}
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="max-w-3xl absolute bottom-15 mb-16 md:ml-16">
            <h1 className="text-5xl  md:text-9xl font-bold mb-6 leading-tight text-[#daff0d] font-heros">
              STRONGER
              <span className="block text-white font-hero md:text-9xl ">EVERYDAY</span>
            </h1>
                                    
            <p className="text-xl md:text-2xl  mb-8 text-[#bdbbbb]">
              Your all-in-one platform for personalized workouts, nutrition guidance, and progress tracking.
            </p>

            <div className="flex flex-row sm:flex sm:flex-row gap-4">
              <button
                onClick={() => navigate("/auth")}
                className="bg-[#daff0d]  transition px-8 py-4 rounded-lg text-black text-lg flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <button
                onClick={() => navigate("/auth")}
                className="border border-white text-white hover:bg-white hover:text-black transition px-8 py-4 rounded-lg text-lg"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="block text-blue-600">Reach Your Goals</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources to support your fitness journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 text-center"
              >
                <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>

                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-100 to-blue-300">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your
              <span className="block text-blue-700">Transformation?</span>
            </h2>

            <p className="text-xl text-gray-700 mb-8">
              Join thousands of users achieving their fitness goals with FitSphere.
            </p>

            <button
              onClick={() => navigate("/auth")}
              className="bg-blue-700 text-white hover:bg-blue-800 transition px-8 py-4 rounded-lg text-lg flex items-center mx-auto"
            >
              Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
