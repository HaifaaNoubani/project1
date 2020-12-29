import Dashboard from "./views/Dashboard.js";
import Clients from "./views/examples/Clients/Clients.js";
import Employee from "./views/examples/Employee/Employee.js";
import Person from "./views/examples/Person/Person.js";
import Services from "./views/examples/Services/Services.js";
import JobOffer from "./views/examples/Joboffer/JobOffer.js";
import JobTime from "./views/examples/JobTime/JobTime.js";
import JobLevel from "./views/examples/JobLevel/JobLevel.js";
import Category from "./views/examples/Category/Category.js";
import RequiredAssessment from "./views/examples/RequiredAssessment/RequiredAssessment.js";
import ContactUs from "./views/examples/ContactUs/ContactUs.js";
import Settings from "./views/examples/Settings/Settings.js";
import Profile from "./views/examples/Profile/Profile.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/clients",
    name: "Clients",
    icon: "ni ni-single-02 text-cyan",
    component: Clients,
    layout: "/admin"
  },
  {
    path: "/employee",
    name: "Employee",
    icon: "ni ni-single-02 text-teal",
    component: Employee,
    layout: "/admin"
  },
  {
    path: "/person",
    name: "Person",
    icon: "ni ni-single-02 text-blue",
    component: Person,
    layout: "/admin"
  },
  {
    path: "/services",
    name: "Services",
    icon: "ni ni-briefcase-24 text-yellow",
    component: Services,
    layout: "/admin"
  },
  {
    path: "/job-offer",
    name: "Job offer",
    icon: "ni ni-collection text-red",
    component: JobOffer,
    layout: "/admin"
  },
  {
    path: "/job-time",
    name: "Job time",
    icon: "ni ni-watch-time text-green",
    component: JobTime,
    layout: "/admin"
  },
  {
    path: "/job-level",
    name: "Job Level",
    icon: "ni ni-chart-bar-32 text-orange",
    component: JobLevel,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Category",
    icon: "ni ni-bullet-list-67 text-pink",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/required-assessment",
    name: "Required Assessment",
    icon: "ni ni-ruler-pencil text-gray",
    component: RequiredAssessment,
    layout: "/admin"
  },
  {
    path: "/contact-us",
    name: "Contact us",
    icon: "ni ni-chat-round text-default",
    component: ContactUs,
    layout: "/admin"
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "ni ni-settings-gear-65 text-dark",
    component: Settings,
    layout: "/admin"
  },
  {
    path: "/profile",
    component: Profile,
    layout: "/admin"
  }
  
];
export default routes;
