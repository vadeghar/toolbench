import Link from "next/link";
import { ToolCard } from "@/components/tools/ToolCard";
import { categoryLabels, getToolsByCategory } from "@/lib/tools/registry";
import type { ToolCategory } from "@/lib/tools/types";

const categories: Array<{ id:string; category:ToolCategory; description:string }> = [
  {id:"calculators",category:"finance",description:"finance & everyday math"},
  {id:"dev-tools",category:"dev",description:"built for developers"},
  {id:"date-time",category:"date-time",description:"dates, times & timestamps"},
  {id:"converters",category:"converters",description:"units & currencies"},
  {id:"generators",category:"generators",description:"passwords, codes & documents"},
  {id:"checkers",category:"checkers",description:"validation & inspection"},
];
const routes:Record<ToolCategory,string>={finance:"/finance-tools",dev:"/dev-tools","date-time":"/date-time",data:"/dev-tools",converters:"/converters",generators:"/generators",checkers:"/checkers"};

export function HomeCatalogue(){
  return <>
    {categories.map(({id,category,description})=>{
      const items=getToolsByCategory(category);
      return <section className="category-section" id={id} key={category}>
        <div className="wrap">
          <div className="cat-head"><span className="cat-dot" data-cat={category}></span><h2>{categoryLabels[category]}</h2><span className="count">{description}</span></div>
          <div className="module-tool-grid">
            {items.slice(0,5).map(tool=><ToolCard key={tool.slug} tool={tool}/>)}
            {items.length>5&&<Link href={routes[category]} className="module-tool-card module-more-card"><h3>More</h3><p>Explore all {categoryLabels[category].toLowerCase()}.</p><span className="tool-card-link">→ View all</span></Link>}
          </div>
        </div>
      </section>
    })}
  </>;
}
