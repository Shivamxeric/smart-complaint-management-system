export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="px-6 py-8">

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* About */}

          <div>
            <h2 className="text-white text-lg font-bold mb-3">
              SCMS
            </h2>

            <p className="text-sm leading-6 text-gray-400">
              Smart Complaint Management System helps
              users submit, track and manage their
              complaints through a centralized platform.
            </p>
          </div>


          {/* Quick Links */}

          <div>
            <h2 className="text-white font-semibold mb-3">
              Quick Links
            </h2>

            <div className="flex flex-col gap-2 text-sm">

              <a
                href="/home"
                className="hover:text-white transition"
              >
                Home
              </a>

              <a
                href="/complaints"
                className="hover:text-white transition"
              >
                My Complaints
              </a>

            </div>
          </div>


          {/* System */}

          <div>
            <h2 className="text-white font-semibold mb-3">
              System
            </h2>

            <p className="text-sm text-gray-400">
              Complaint Management
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Secure & User Based
            </p>
          </div>

        </div>


        <div className="max-w-7xl mx-auto border-t border-gray-700 mt-8 pt-5 text-center">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Smart Complaint
            Management System. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}