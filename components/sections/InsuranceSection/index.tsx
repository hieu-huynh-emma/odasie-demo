// components/Insurance.tsx
import React from 'react';
import Section from '@/components/sections/Section';
// Make sure to import the correct type and icon helper/component
import FeatureIcon from '@/components/ui/featuredIcon';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { InsuranceSolutionSection } from '@/types/insurance';
import DynamicIcon from '@/components/DynamicIcon';

export default function Insurance({
  section,
}: {
  lang: string;
  section: InsuranceSolutionSection; // Use the updated type
}) {
  // Destructure for easier access
  const { title, description, table, callToAction, extraLinks, extraInfo } =
    section;
  const { headingColumns, rows, footerColumns } = table;

  // Helper to split column headers if needed (like the original)
  const formatHeader = (text: string) => {
    const parts = text.split(' ');
    if (parts.length > 1) {
      return (
        <>
          <div className="mb-1">{parts[0]}</div>
          <div>{parts.slice(1).join(' ')}</div>
        </>
      );
    }
    return text;
  };

  return (
    <Section>
      <div className="mx-auto max-w-6xl p-6 font-primary">
        {/* Header - Use dynamic data */}
        <h1 className="text-primary mb-3 text-center text-4xl font-medium">
          {title}
        </h1>
        <p className="mb-10 text-center text-base text-gray-700">
          {description}
        </p>

        {/* Table with sticky first column and fixed layout */}
        {/* Added overflow-x-auto for horizontal scrolling on small screens */}
        <div className="overflow-x-auto">
          {/* Reverted to table-fixed for better compatibility with colgroup widths */}
          <table className="border-gray min-w-full table-fixed overflow-hidden rounded-lg border shadow-[0px_1px_2px_0px_#1018280F,0px_1px_3px_0px_#1018281A]">
            {/* --- FIX START --- */}
            <colgroup>
              {/* Define column widths */}
              <col className="w-[180px] md:w-[200px]" />{' '}
              {/* Sticky column width */}
              {/* Map data columns to <col> elements. Comments are outside the map's return value */}
              {headingColumns.map((_, index) => (
                // Ensure each item returned by map is *only* the <col> element
                <col key={`col-${index}`} className="w-36" />
              ))}
            </colgroup>
            {/* --- FIX END --- */}
            <thead className="bg-gray-50">
              <tr>
                {/* Sticky Header Cell */}
                <th className="sticky left-0 z-10 border-b bg-gray-50 p-3 text-left text-sm font-medium">
                  {/* Empty header cell */}
                </th>
                {/* Map dynamic heading columns */}
                {headingColumns.map((col, index) => {
                  const isLastTwo = index >= headingColumns.length - 2;
                  return (
                    <th
                      key={col.id}
                      // Apply consistent padding/styling, width is handled by colgroup
                      // Add yellow top border conditionally for the last two columns
                      // --- TYPO FIX START ---
                      className={`relative border-b px-4 py-3 text-center text-sm font-bold ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} ${isLastTwo ? 'border-t-2 border-yellow-500' : ''} `}
                      // --- TYPO FIX END ---
                    >
                      {formatHeader(col.text)}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {/* Map dynamic rows */}
              {rows.map(row =>
                // Special handling for rows spanning all columns (like Covid)
                row.expandAllColumns ? (
                  <tr
                    key={row.id}
                    className="border-b-1 border-t border-red-100 bg-red-50">
                    <td
                      colSpan={headingColumns.length + 1}
                      className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-3">
                        <DynamicIcon
                          name={row.icon.name}
                          size={row.icon.size}
                        />
                        <p>
                          {row.title && <strong>{row.title}</strong>}{' '}
                          {row.description}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  // Regular feature rows
                  <tr key={row.id} className="border-t">
                    {/* Sticky first column */}
                    <td className="sticky left-0 z-10 flex items-center bg-gray-50 px-4 py-3 text-sm font-normal">
                      <div className="flex shrink-0 items-center">
                        <DynamicIcon
                          name={row.icon.name}
                          size={row.icon.size}
                        />
                      </div>
                      <span className="ml-3 truncate">{row.description}</span>
                    </td>
                    {/* Map checks for each column */}
                    {row.checks.map((check, index) => (
                      <td
                        key={check.id}
                        className={`px-4 py-3 text-center ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <FeatureIcon included={check.included ?? false} />
                      </td>
                    ))}
                  </tr>
                ),
              )}

              {/* Learn more row */}
              <tr className="border-t">
                {/* Sticky Footer Cell */}
                <td className="sticky left-0 z-10 bg-gray-50 px-4 py-3" />
                {footerColumns.map((footerCol, idx) => (
                  <td
                    key={footerCol.id}
                    className={`px-4 py-3 text-center ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <Link
                      href={footerCol.url}
                      target={footerCol.newTab ? '_blank' : '_self'}
                      rel={footerCol.newTab ? 'noopener noreferrer' : undefined}
                      className="whitespace-nowrap border-b border-blue-900 text-sm font-bold text-blue-900 hover:text-blue-950">
                      {footerCol.text}
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* CTA - Use dynamic data */}
        <div className="mt-8 text-center">
          <Button
            className="rounded-full bg-yellow-500 px-6 py-2 font-medium text-black hover:bg-yellow-600"
            asChild>
            <Link
              href={callToAction.url}
              target={callToAction.newTab ? '_blank' : '_self'}
              rel={callToAction.newTab ? 'noopener noreferrer' : undefined}>
              {callToAction.label}
            </Link>
          </Button>
        </div>

        {/* Footer links & copy - Use dynamic data */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            {extraLinks.map(link => (
              <React.Fragment key={link.id}>
                {/* //#00425E color use */}
                <Link
                  href={link.url}
                  target={link.newTab ? '_blank' : '_self'}
                  rel={link.newTab ? 'noopener noreferrer' : undefined}
                  className="whitespace-nowrap border-b border-sky-950 font-bold text-sky-950">
                  {link.text}
                </Link>
              </React.Fragment>
            ))}
          </div>
          <p className="mx-auto max-w-3xl whitespace-pre-line text-xs text-gray-500">
            {extraInfo}
          </p>
        </div>
      </div>
    </Section>
  );
}
