const Testimonials = () => {
    return(
        <section className="py-16 px-5 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Players Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="italic mb-4">"The best turf I've played on! Perfect surface and great facilities."</p>
              <div className="font-semibold">- Michael R.</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
              <p className="italic mb-4">"Easy booking process and the staff is very helpful. Highly recommend!"</p>
              <div className="font-semibold">- Sarah K.</div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-yellow-400 mb-4">⭐⭐⭐⭐</div>
              <p className="italic mb-4">"Great location and quality turf. Will definitely book again."</p>
              <div className="font-semibold">- David L.</div>
            </div>
          </div>
        </div>
      </section>
    )
}
export default Testimonials