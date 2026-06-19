import content from "../../data/content";
import Card from "../ui/Card";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        {content.contact.heading}
      </h2>
      <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <Card hover={false} className="text-center">
          <p className="text-sm uppercase tracking-widest text-orange-500 font-medium mb-2">
            Frequency
          </p>
          <p className="text-xl font-bold text-white">{content.contact.frequency}</p>
        </Card>
        <Card hover={false} className="text-center">
          <p className="text-sm uppercase tracking-widest text-orange-500 font-medium mb-2">
            Location
          </p>
          <a
            href={content.contact.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-white hover:text-orange-500 transition-colors"
          >
            {content.contact.location}
          </a>
        </Card>
        <Card hover={false} className="text-center">
          <p className="text-sm uppercase tracking-widest text-orange-500 font-medium mb-2">
            Email
          </p>
          <a
            href={`mailto:${content.contact.email}`}
            className="text-xl font-bold text-white hover:text-orange-500 transition-colors break-all"
          >
            {content.contact.email}
          </a>
        </Card>
      </div>
    </section>
  );
}