'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  // General
  {
    id: 1,
    category: 'General',
    question: 'How does Strata AI work?',
    answer: 'Simply upload your meeting recording (audio or video file), select your building size and state, and our AI will transcribe and generate legally compliant minutes within 10 minutes. You\'ll receive both DOCX and PDF formats via email.'
  },
  {
    id: 2,
    category: 'General',
    question: 'What file formats do you accept?',
    answer: 'We accept all common audio formats (MP3, WAV, M4A, AAC) and video formats (MP4, MOV, AVI, WebM). Files can be up to 3 hours in length and 500MB in size. If you have a larger file, please contact our support team.'
  },
  {
    id: 3,
    category: 'General',
    question: 'How long does processing take?',
    answer: 'Most meetings are processed within 10 minutes. For longer meetings (over 2 hours) or during peak times, processing may take up to 20 minutes. You\'ll receive an email notification as soon as your minutes are ready.'
  },
  {
    id: 4,
    category: 'General',
    question: 'Is it legally compliant?',
    answer: 'Yes! Our AI is trained on state-specific legislation and generates minutes that comply with all requirements for NSW, VIC, QLD, SA, WA, TAS, ACT, and NT. Each set of minutes includes all mandatory elements required by law in your state.'
  },

  // Pricing
  {
    id: 5,
    category: 'Pricing',
    question: 'How do you determine building size?',
    answer: 'Building size is based on the number of units/lots in your strata scheme: Small (<20 units) = $199, Medium (20-100 units) = $349, Large (100+ units) = $499. Select the tier that matches your scheme when uploading.'
  },
  {
    id: 6,
    category: 'Pricing',
    question: 'Can I get a refund?',
    answer: 'Yes, we offer a 100% money-back guarantee. If you\'re not satisfied with the quality of your minutes, contact us within 24 hours of delivery for a full refund. We also offer one free revision within 24 hours of delivery.'
  },
  {
    id: 7,
    category: 'Pricing',
    question: 'Do you offer bulk discounts?',
    answer: 'Yes! For strata management companies processing multiple meetings per month, we offer B2B pricing starting at $299/meeting for 1-20 meetings monthly, down to $149/meeting for 100+ meetings. Contact us for enterprise pricing and white-label options.'
  },

  // Legal
  {
    id: 8,
    category: 'Legal',
    question: 'Which states are supported?',
    answer: 'We support all Australian states and territories: NSW, VIC, QLD, SA, WA, TAS, ACT, and NT. Each state has specific legislative requirements, and our AI is trained to generate compliant minutes for each jurisdiction.'
  },
  {
    id: 9,
    category: 'Legal',
    question: 'What legislation do you follow?',
    answer: 'We follow all relevant strata legislation: NSW (Strata Schemes Management Act 2015), VIC (Owners Corporations Act 2006), QLD (Body Corporate and Community Management Act 1997), SA (Strata Titles Act 1988), WA (Strata Titles Act 1985), TAS (Strata Titles Act 1998), ACT (Unit Titles Act 2001), NT (Unit Titles Act).'
  },
  {
    id: 10,
    category: 'Legal',
    question: 'Can I edit the minutes?',
    answer: 'Absolutely! You receive the minutes in DOCX format, which you can edit in Microsoft Word, Google Docs, or any word processor. We recommend reviewing and making any necessary adjustments before distributing to owners.'
  },
  {
    id: 11,
    category: 'Legal',
    question: 'Who owns the generated minutes?',
    answer: 'You own all rights to the generated minutes. Once delivered, they are your property to use, edit, and distribute as needed. We don\'t retain copies of your minutes or use them for any purpose other than delivery.'
  },

  // Technical
  {
    id: 12,
    category: 'Technical',
    question: 'Is my data secure?',
    answer: 'Yes. All uploads are encrypted using 256-bit SSL encryption. Your recordings are stored securely in Australian data centers and are automatically deleted 30 days after processing. We\'re GDPR compliant and follow Australian Privacy Principles.'
  },
  {
    id: 13,
    category: 'Technical',
    question: 'How do I receive the minutes?',
    answer: 'Minutes are delivered via email to the address you provide during upload. You\'ll receive both a DOCX (editable) and PDF (final) version. The email includes a download link valid for 30 days.'
  },
  {
    id: 14,
    category: 'Technical',
    question: 'What if the audio quality is poor?',
    answer: 'Our AI can handle most audio quality issues, including background noise and multiple speakers. However, for best results, we recommend using a dedicated recording device placed centrally in the room. If the audio is too poor to process, we\'ll notify you and offer a full refund.'
  },
  {
    id: 15,
    category: 'Technical',
    question: 'Can I upload multiple meetings at once?',
    answer: 'Yes! B2B customers have access to a bulk upload dashboard where you can upload and process multiple meetings simultaneously. For individual customers, you can upload meetings one at a time through our standard portal.'
  },
];

const categories = ['General', 'Pricing', 'Legal', 'Technical'];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [activeCategory, setActiveCategory] = useState<string>('General');

  const filteredFAQs = faqs.filter(faq => faq.category === activeCategory);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Strata AI
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenId(null);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {filteredFAQs.map((faq, index) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-primary-300 transition-colors"
                >
                  <button
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                    aria-expanded={openId === faq.id}
                  >
                    <span className="font-semibold text-gray-900 pr-8 text-lg">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 text-primary-600">
                      {openId === faq.id ? (
                        <Minus className="w-5 h-5" />
                      ) : (
                        <Plus className="w-5 h-5" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence>
                    {openId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Still Have Questions? */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a
            href="mailto:support@strata-ai.com"
            className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            Contact our support team
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
