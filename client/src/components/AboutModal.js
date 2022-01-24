export default function AboutModal() {
    return (
        <div className="modal fade" id="aboutModal" tabIndex="-1">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content about-modal-body">
              <div className="modal-header">
                <h3 className="modal-title">About</h3>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body flex-col">
                <p>Shin Megami Tensei IV is a role-playing video game released by Atlus in 2013. In it, you must recruit and fuse demons together to create newer, stronger party members.</p>
                <p>Every demon has a set number of skills that it knows. Fused demons inherit the skills of the demons that were used to create it. Since skill slots are limited to a maximum of 8, fusing demons often means some skills must be discarded.</p>
                <p>This app was designed to help players keep track of which of their demons know which skills so they can decide which to keep and which to discard when performing fusions.</p>
                <p>Special thank you to the ever-helpful <a href="https://aqiu384.github.io/megaten-fusion-tool/smt4/demons">Megami Tensei Fusion Tools</a>, from which this app's list of skills and their descriptions were taken.</p>
                <p>Interested in viewing this project's source code? See it here:</p>
                <p><a className="text-center" href="https://github.com/ArtisanSelects/smtiv-skill-manager">https://github.com/ArtisanSelects/smtiv-skill-manager</a></p>
              </div>
              <div className="modal-footer">
                <button className="btn-modal-close btn-orange btn-generic" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    );
}