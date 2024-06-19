import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react'

const features = [
    { title: "Is it easy to change plans?", content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS. "},
    { title: "Can I cancel at any time?", content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS. "},
    { title: "Are there any Credit card or Paypal fees?", content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS. "},
    { title: "Do I have to choose my plan before I start my trial?", content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS. "},
    { title: "Edututs+ isn't for me. Can I have a refund?", content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS. "},
    { title: "How I get my money?", content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS. "},
    { title: "Do I need a credit card to sign up?", content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS. "},
    { title: "I still have questions. HELP!", content: "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.le VHS. "},
];

const MembershipFaq: React.FC = () => {
    const [openItemIndex, setOpenItemIndex] = useState<number | null>(null);
    
    const toggleItem = (index: number) => {
        setOpenItemIndex((prevIndex) => (prevIndex === index ? null : index));
      };

  return (
    <div className='p-6'>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <React.Fragment key={index}>
              <li className="flex flex-col">
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleItem(index)}
                >
                  <div className="flex items-center">
                    <h4 className="text-lg font-semibold">{feature.title}</h4>
                  </div>
                  {openItemIndex === index ? (
                    <MinusOutlined />
                  ) : (
                    <PlusOutlined />
                  )}
                </div>
                {openItemIndex === index && (
                  <div className="ml-2 mb-4 mt-4 text-gray-500">
                    {feature.content}
                  </div>
                )}
              </li>
              {index < features.length - 1 && (
                <hr className="my-10 border-gray-200" />
              )}
            </React.Fragment>
          ))}
        </ul>
    </div>
  )
}

export default MembershipFaq;