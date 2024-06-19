const ReportContents = () => {
  return (
    <div className="p-5 text-black">
      <div className="-ml-5 -mr-3 -mt-5 flex items-center justify-center bg-gray-800 p-12">
        <div className="flex flex-col">
          <h2
            className="rounded text-2xl font-semibold text-white"
            style={{
              marginBottom: "0.5em",
              marginInlineStart: "40px",
            }}
          >
            Thanks for reporting!
          </h2>
          <h2
            className="rounded text-sm font-light text-white"
            style={{
              marginBottom: "0.5em",
              marginInlineStart: "40px",
            }}
          >
            Any member of the FPT community can flag content to us that they
            believe violates our Community Guidelines. When something is
            flagged, it’s not automatically taken down. Flagged content is
            reviewed in line with the following guidelines:
          </h2>
          <h2
            className="rounded text-sm font-light text-white"
            style={{
              marginBottom: "0.5em",
              marginInlineStart: "50px",
              textIndent: "2em",
            }}
          >
            - Content that violates our Community Guidelines is removed from
            Edututs+.
          </h2>
          <h2
            className="rounded text-sm font-light text-white"
            style={{
              marginBottom: "0.5em",
              marginInlineStart: "50px",
              textIndent: "2em",
            }}
          >
            - Content that may not be appropriate for all younger audiences may
            be age-restricted.
          </h2>
          <a
            className="rounded text-sm font-light text-white"
            style={{
              marginBottom: "0.5em",
              marginInlineStart: "40px",
            }}
          >
            Learn more about reporting content on Cursus.
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReportContents;
